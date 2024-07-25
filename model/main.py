import numpy
import pandas as pd 
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import GaussianNB
from sklearn.metrics import accuracy_score
from typing import Union
from fastapi import FastAPI,Request
app = FastAPI()
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse


@app.post("/api/v1/postsentence")
async def postsentence(request:Request):
    df=pd.read_csv("./dftocsv.csv")
    data= await request.json()
    sentence=data.get("sentence")
    sentiment=data.get("sentiment")
    x1={
        'Sentence':sentence,
        'Sentiment':sentiment
    }
    df = df._append(x1,ignore_index=True)
    df.to_csv("./dftocsv.csv", index=False) 
    json_compatible_item_data = jsonable_encoder({
        "dta":"okay "
    })
    return JSONResponse(content=json_compatible_item_data)

@app.post("/api/v1/predictsentence")
async def read_root(request:Request):
    data=await request.json()
    data_r=data.get("sentence")
    x1=pd.DataFrame(
        {
            'Sentence':[data_r],
            'Sentiment':[0]
        }
    )
    x1=x1.iloc[:,0]
    pred,score= model(x1)
    json_compatible_item_data = jsonable_encoder({"prediction":pred,"score":score})
    return JSONResponse(content=json_compatible_item_data)
     




def model(test):
    df=pd.read_csv("./dftocsv.csv")
    X=df["Sentence"]
    y=df["Sentiment"]
    X_train, X_test, y_train, y_test=train_test_split(X,y,test_size=0.2,random_state=3)
    V=CountVectorizer()
    X_v_train=V.fit_transform(X_train).toarray()
    X_v_test=V.transform(X_test).toarray()
    test=V.transform(test).toarray()
    gnb=GaussianNB()
    gnb.fit(X_v_train,y_train)
    y_pred=gnb.predict(X_v_test)
    for i in range (len(y_pred)):
            if y_pred[i]==1:
                print(X_test.iloc[i],"positive comment!")
            else:
                print(X_test.iloc[i],"negative comment")
    ascore=accuracy_score(y_test,y_pred)
    print(ascore)
    return  str(gnb.predict(test)).replace("[","").replace("]",""),ascore


