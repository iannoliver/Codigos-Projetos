"""
    Ativar o ambiente virtual venv/scripts/activate
"""

from pdfminer.high_level import extract_text
import json


def pdf_to_text(filename):
    text = extract_text(filename)
    symbols_to_remove = [""]

    for symbol in symbols_to_remove:
        text = text.replace(symbol, "")

    return text


def text_to_txt(content):
    with open("file.txt", "w", encoding="utf-8") as file:
        file.write(content)



def insert_faq(SEARCH_ASSIST_FAQS, questions, answers):
    faq = {
            "_id": "",
            "_meta": {
                "isFollowupQuestion": False,
                "followupQuestionIds": []
            },
            "_source": {
                "faq_question": questions[0],
                "keywords": [],
                "faq_answer": [
                    {
                        "text": answers[0]
                    }
                ],
                "faq_cond_answers": [],
                "faq_alt_questions": []
            }
        }

    for index in range(1, len(questions)):
        faq["_source"]["faq_alt_questions"].append(questions[index])

    SEARCH_ASSIST_FAQS["faqs"].append(faq)

    return SEARCH_ASSIST_FAQS


def faqs_to_json(SEARCH_ASSIST_FAQS):
    with  open("faqs.json", "w", encoding="utf-8") as file:
        json.dump(SEARCH_ASSIST_FAQS, file, indent=4, ensure_ascii=False)

def extract_info_from_text(filename):
    faqs = {"faqs": []}
    current_questions = []
    current_answers = []

    with open(filename, "r", encoding="utf-8") as file:
        for line in file:
            if line.startswith("Pergunta:"):
                if current_questions:
                    faqs = insert_faq(faqs, current_questions, current_answers)
                    current_questions = []
                    current_answers = []

                current_questions.append(line[len("Pergunta:"):].strip())
            elif line.startswith("Resposta:"):
                current_answer = line[len("Resposta:"):].strip()
                next_line = file.readline().strip()
                while next_line and not next_line.startswith("Pergunta:") and not next_line.startswith("Resposta:"):
                    current_answer += " " + next_line
                    next_line = file.readline().strip()
                current_answers.append(current_answer)
                if next_line.startswith("Resposta:"):
                    file.seek(file.tell() - len(next_line))  
                    continue
            else:
                if current_questions:
                    current_questions[-1] += " " + line.strip()

    if current_questions:
        faqs = insert_faq(faqs, current_questions, current_answers)

    return faqs

def insert_faq(faqs, perguntas, respostas):
    if len(perguntas) > 1:
        faq_question = perguntas[0].split("?")[0]  
        faq_alt_questions = perguntas[1:]  
    else:
        faq_question = perguntas[0]
        faq_alt_questions = []

    faq = {
        "_id": "",
        "_meta": {
            "isFollowupQuestion": False,
            "followupQuestionIds": []
        },
        "_source": {
            "faq_question": faq_question.strip(),
            "keywords": [],
            "faq_answer": [{"text": answer} for answer in respostas],  
            "faq_cond_answers": [],
            "faq_alt_questions": faq_alt_questions  
        }
    }
    faqs["faqs"].append(faq)
    return faqs



def main():

    # text = pdf_to_text("CHATBOT - CG LONDRES.pdf")
    # text_to_txt(text)

    faqs = extract_info_from_text("file.txt")

    with open("faqs.json", "w", encoding="utf-8") as file:
        json.dump(faqs, file, indent=4, ensure_ascii=False)

main()

# insert_faq(questions=["Questão 1", "Questão alternativa do Iann", "Questão alternativa do Kevin"],answers=["Resposta marota"])
# faqs_to_json()
