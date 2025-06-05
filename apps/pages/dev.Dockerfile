FROM gjuplans/base
WORKDIR /gjuplans/apps/pages

COPY . ./

EXPOSE 4321

CMD ["npm", "run", "dev"]
