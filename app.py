# from flask import Flask, render_template, request
# from chat import make_question
#
# app = Flask(__name__)
#
# make_question = make_question()
#
# def get_response(user_input):
#     user_input = user_input.lower()
#     response = make_question.run(user_input)
#     return response
#
# @app.route("/")
# def index():
#     return render_template("index.html")
#
# @app.route("/get_response", methods=["POST"])
# def get_user_response():
#     user_input = request.form["user_input"]
#     response = get_response(user_input)
#     return response
#
# if __name__ == "__main__":
#     app.run(debug=True)

from flask import Flask, render_template, request, jsonify

from chat import make_question

app = Flask(__name__)
make_question = make_question()

@app.get("/")
def index_get():
    return render_template("base.html")

@app.post("/predict")
def predict():
    text = request.get_json().get("message")
    # TODO: check if text  is valid
    response = make_question.run(text)
    message = {"answer": response}
    return jsonify(message)

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')
