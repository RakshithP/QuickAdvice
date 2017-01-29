from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords

sentence="This is where the message goes"
stop_word=set(stopwords.words("english"))
word=word_tokenize(sentence)
senten=[w for w in the range if not in stop_word]

sym= ["cough", "difficulty breathing", "nasal congestion", "muscle ache", "fatigue", "cold", "fever", "spasms", "body pain", "nausea", "abdominal pain", "diarrhea", "seizures","inflamed eyes", "red skin rash", "sore throat", "weight loss", "night sweat"]
for i in senten:
	for j in sym:
		if(senten[i]==sym[j])
			fin_sentence = senten[i]
