<?php
if ( ! class_exists( 'WP_Webhooks_Integrations_wordpress_Actions_create_folder' ) ) :

	/**
	 * Load the create_folder action
	 *
	 * @since 4.2.0
	 * @author Ironikus <info@ironikus.com>
	 */
	class WP_Webhooks_Integrations_wordpress_Actions_create_folder {

		public function is_active(){

			//Backwards compatibility for the "Comments" integration
			if( class_exists( 'WP_Webhooks_Pro_Remote_File_Control' ) ){
				return false;
			}

			return true;
		}

		public function get_details(){

			$translation_ident = "action-create_folder-description";

			$parameter = array(
				'folder'	   => array( 'required' => true, 'short_description' => WPWHPRO()->helpers->translate( 'The relative path as well as the folder name. For example: wp-content/themes/demo-theme/demo-folder (See the details for more information)', $translation_ident ) ),
				'mode'	   => array( 'short_description' => WPWHPRO()->helpers->translate( 'The mode is 0777 by default, which means the widest possible access.', $translation_ident ) ),
				'recursive'	   => array( 'short_description' => WPWHPRO()->helpers->translate( 'Allows the creation of nested directories specified in the pathname. Possible values: "yes" and "no". Default: "no". If set to yes, all in your path mentioned folders will be created if they don\'t exist.', $translation_ident ) ),
				'do_action'	 => array( 'short_description' => WPWHPRO()->helpers->translate( 'Advanced: Register a custom action after Webhooks Pro fires this webhook.', $translation_ident ) )
			);

			ob_start();
			?>
<p><?php echo WPWHPRO()->helpers->translate( 'In case you want to create a folder within the WordPress root folder, just declare the folder itself:', $translation_ident ); ?></p>
<br>
<pre>demo-folder</pre>
			<?php
			$parameter['folder']['description'] = ob_get_clean();

			ob_start();
		?>
<?php echo WPWHPRO()->helpers->translate( "The do_action argument is an advanced webhook for developers. It allows you to fire a custom WordPress hook after the action was fired.", $translation_ident ); ?>
<br>
<?php echo WPWHPRO()->helpers->translate( "You can use it to trigger further logic after the webhook action. Here's an example:", $translation_ident ); ?>
<br>
<br>
<?php echo WPWHPRO()->helpers->translate( "Let's assume you set for the <strong>do_action</strong> parameter <strong>fire_this_function</strong>. In this case, we will trigger an action with the hook name <strong>fire_this_function</strong>. Here's how the code would look in this case:", $translation_ident ); ?>
<pre>add_action( 'fire_this_function', 'my_custom_callback_function', 20, 2 );
function my_custom_callback_function( $return_args, $folder ){
	//run your custom logic in here
}
</pre>
<?php echo WPWHPRO()->helpers->translate( "Here's an explanation to each of the variables that are sent over within the custom function.", $translation_ident ); ?>
<ol>
<li>
		<strong>$return_args</strong> (array)<br>
		<?php echo WPWHPRO()->helpers->translate( "An array containing the information we will send back as the response to the initial webhook caller.", $translation_ident ); ?>
	</li>
	<li>
		<strong>$folder</strong> (string)<br>
		<?php echo WPWHPRO()->helpers->translate( "The folder you set within the webhook request.", $translation_ident ); ?>
	</li>
</ol>
			<?php
			$parameter['do_action']['description'] = ob_get_clean();

			$returns = array(
				'success'		=> array( 'short_description' => WPWHPRO()->helpers->translate( '(Bool) True if the action was successful, false if not. E.g. array( \'success\' => true )', $translation_ident ) ),
				'msg'		=> array( 'short_description' => WPWHPRO()->helpers->translate( '(string) A message with more information about the current request. E.g. array( \'msg\' => "This action was successful." )', $translation_ident ) ),
			);

			$returns_code = array (
				'success' => true,
				'msg' => 'Folder successfully created.',
			);

			$description = WPWHPRO()->webhook->get_endpoint_description( 'action', array(
				'webhook_name' => 'Create a folder',
				'webhook_slug' => 'create_folder',
				'tipps' => array(
					WPWHPRO()->helpers->translate( "For security reasons, we restrict the creation of folders to the WordPress root folder and its sub folders. This means, that you have to define the path in a relative way. Here is an example:", $translation_ident ) . '<code>wp-content/themes/demo-theme/demo-folder</code>',
					WPWHPRO()->helpers->translate( "Please note: The folder structure must exist before you can create the file. Otherwise this webhook will return an error.", $translation_ident ),
				)
			) );

			return array(
				'action'			=> 'create_folder',
				'name'			  => WPWHPRO()->helpers->translate( 'Create folder', $translation_ident ),
				'sentence'			  => WPWHPRO()->helpers->translate( 'create a folder', $translation_ident ),
				'parameter'		 => $parameter,
				'returns'		   => $returns,
				'returns_code'	  => $returns_code,
				'short_description' => WPWHPRO()->helpers->translate( 'Create a folder via a webhook inside of your WordPress folder structure.', $translation_ident ),
				'description'	   => $description,
				'integration'	   => 'wordpress',
				'premium' 			=> true,
			);

		}

	}

endif; // End if class_exists check.