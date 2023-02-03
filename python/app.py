from flask import Flask
import mecab

app = Flask(__name__)
mcb = mecab.MeCab()

@app.route('/<words>')
def home(words):
    return mcb.pos(words)

if __name__ == '__main__':
    app.run(host='0.0.0.0',port='5000',debug=True)