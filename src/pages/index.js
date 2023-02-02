import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Container from "@material-ui/core/Container";
import Input from "@material-ui/core/Input";

import firebase from "../config/firebase";

export default function Home() {
  //useFormの返却値から､register, handleSubmit, resetを取り出す｡
  //handleSubmit: フォーム送信時に内容を取得する
  //register: Input要素の値を取得､バリデートするための登録機能
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
    watch,
  } = useForm();

  //定義する
  const isLearning = watch("isLearning");
  const wasLearning = watch("wasLearning");

  //DB
  const [questionnaire, setQuestionnaire] = useState(null)
    // const [value, setValue] = useState('')

  const onSubmit = (data) => {
    console.log(data.name);
    console.log(data.birth);
    console.log(data.language);
    console.log("submitted!");
    firebase.firestore().collection('questionnaire').add({
      name: data.name,
      birth: data.birth,
      wasLearning:isLearning,
      isLearning:wasLearning,
      language:data.language,
  })
    // フォームに入力した値をリセット
    reset();
  };

  //DB
  useEffect(() => {
    firebase
      .firestore()
      .collection("questionnaire")
      .onSnapshot((snapshot) => {
        const questionnaire = snapshot.docs.map((doc) => {
          return doc.data();
        });

        setQuestionnaire(questionnaire);
      });
  }, []);

  

  return (
    <>
      <Container>
        <h1>プログラミング学習に関するアンケート</h1>
        {/* onSubmit 関数を引数として handleSubmit 関数が呼び出される */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name">Q1. 名前を入力してください。(匿名可)</label>
            {/* react-hook-formのregister関数を使用して、フォームの入力フィールドを登録 */}
            <Controller
              name="name"
              defaultValue=""
              control={control}
              render={({ field: { value, onChange } }) => (
                <Input value={value} onChange={onChange} />
              )}
            />
          </div>
          <div>
            <label htmlFor="birth">
              Q2. 生年月日を入力してください。(例: 19900101)*
            </label>
            <Controller
              name="birth"
              defaultValue=""
              control={control}
              rules={{ required: true, pattern: /^[0-9]{8}$/ }}
              render={({ field: { value, onChange } }) => (
                <Input value={value} onChange={onChange} />
              )}
            />
            {errors.birth && errors.birth.type === "required" ? (
              <span>このフィールドは回答必須です。</span>
            ) : null}
            {errors.birth && errors.birth.type === "pattern" ? (
              <span>整数8桁で入力してください。</span>
            ) : null}
          </div>
          <div>
            <span>Q3. 現在､プログラミングを学習していますか？*</span>
            {/* ラジオボタンの場合、同じラジオボタングループに属するためには、nameを一致させる必要がある */}
            <input
              type="radio"
              {...register("isLearning", {
                required: true,
              })}
              name="isLearning"
              id="isLearning1"
              value="true"
            />
            <label htmlFor="isLearning1">はい</label>

            <input
              type="radio"
              {...register("isLearning", {
                required: true,
              })}
              name="isLearning"
              id="isLearning2"
              value="false"
            />
            <label htmlFor="isLearning2">いいえ</label>
          </div>
          <div>
            <span>
              Q4. これまでに､プログラミングを学習したことがありますか？*
            </span>
            <input
              type="radio"
              {...register("wasLearning", {
                required: true,
              })}
              name="wasLearning"
              id="wasLearning1"
              value="true"
            />
            <label htmlFor="wasLearning1">はい</label>

            <input
              type="radio"
              {...register("wasLearning", {
                required: true,
              })}
              name="wasLearning"
              id="wasLearning2"
              value="false"
            />
            <label htmlFor="wasLearning2">いいえ</label>

            <input
              type="radio"
              {...register("wasLearning", {
                required: true,
              })}
              name="wasLearning"
              id="wasLearning3"
              value="unknown"
            />
            <label htmlFor="wasLearning3">わからない</label>
          </div>

          {isLearning === "true" || wasLearning === "true" ? (
            <div>
              <label htmlFor="codingLanguage">
                Q5.
                今まで学習したことのあるプログラミング言語をすべて教えてください。
              </label>
              <Controller
                name="language"
                defaultValue=""
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Input value={value} onChange={onChange} />
                )}
              />
            </div>
          ) : null}

          <input type="submit" value="アンケートを提出する" />
        </form>
      </Container>
    </>
  );
}

//バリデーション(validation)は、入力されたデータが規定の条件を満たしているかを検証すること｡
//register関数は、入力フィールドを登録し、そのフィールドに対してバリデーションなどの機能を提供する。
//,  {...register("wasLearning" , {required: true})} registerの第二引数でフォームバリデーションを行うことが可能
//required: trueで回答しなければ､送信ができなくなる
// ^ : 文字列の先頭を表します。
// [0-9] : 0から9までの数字の中から一文字を表します。
// {8} : 直前の表現（今回の場合は[0-9]）が8回繰り返されることを表します。
// $ : 文字列の末尾を表します。

//Q20. firestoreを導入し、アンケート結果をDBに記録しましょう。
