from langchain.chains import VectorDBQA
from langchain.llms import OpenAI

from langchain.document_loaders import PyPDFLoader
from langchain.document_loaders import TextLoader
from langchain.document_loaders import Docx2txtLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain.vectorstores import Chroma
from langchain.embeddings.openai import OpenAIEmbeddings

import os

def make_question():
  print('make_question запустилась')
  #  Этот код разбивает документ на чанки
  document=[]
  for file in os.listdir("docs"):  # Выбирается наш фалй, для чанков

    if file.endswith(".pdf"):
      pdf_path="./docs/"+file
      loader=PyPDFLoader(pdf_path)
      document.extend(loader.load())

    elif file.endswith('.docx') or file.endswith('.doc'):
      doc_path="./docs/"+file
      loader=Docx2txtLoader(doc_path)
      document.extend(loader.load())

    elif file.endswith('.txt'):
      text_path="./docs/"+file
      loader=TextLoader(text_path)
      document.extend(loader.load())

  document_splitter=CharacterTextSplitter(separator='\n', chunk_size=500, chunk_overlap=100)
  document_chunks=document_splitter.split_documents(document)

  # Этот код создает ембендинги и инициализирует само подключение
  os.environ["OPENAI_API_KEY"]="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"
  embeddings = OpenAIEmbeddings()
  vectordb=Chroma.from_documents(document_chunks, embedding=embeddings, persist_directory='./data')
  vectordb.persist()

  #
  qa = VectorDBQA.from_chain_type(llm=OpenAI(), chain_type="stuff", vectorstore=vectordb)
  return qa