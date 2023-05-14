FROM node:18
WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile --non-interactive
WORKDIR /app/packages/gatsby-site
EXPOSE 8000
CMD ["yarn",  "develop", "-H", "0.0.0.0"]