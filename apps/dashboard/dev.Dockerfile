FROM gjuplans/base
WORKDIR /gjuplans/apps/dashboard

COPY . ./

EXPOSE 5173

CMD ["npm", "run", "dev"]
