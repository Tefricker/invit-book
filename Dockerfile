FROM node:10.16.0-alpine
RUN mkdir -p /opt/app
WORKDIR /opt/app
RUN adduser --disabled-password app
COPY . .
RUN chown -R app:app /opt/app
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh
USER app
RUN npm install
EXPOSE 8070
CMD [ "npm", "run", "pm2" ]