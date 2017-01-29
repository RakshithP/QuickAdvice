import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
import sys
a= []
senten = sys.argv[1].lower()
fin_sentence = []
stop_word=set(stopwords.words("english"))
word=word_tokenize(senten)

for w in word:
        if (w not in stop_word):
                a.append(w)
print(a)        


sym= ["cough", "difficulty breathing", "nasal congestion", "muscle ache", "fatigue", "cold", "fever", "spasms", "body pain", "nausea", "abdominal pain", "diarrhea", "seizures","inflamed eyes", "red skin rash", "sore throat", "weight loss", "night sweat"]


sys.stdout.flush()
