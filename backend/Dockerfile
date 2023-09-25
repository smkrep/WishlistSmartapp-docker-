FROM python:alpine

WORKDIR /backend

RUN pip3 install flask
RUN pip3 install pymongo
RUN pip3 install flask_cors

COPY ./api .

CMD ["flask", "--app", "index", "run"]

