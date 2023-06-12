export interface ApiInput {
  text: string;
  youonIsChecked: boolean;
  sokuonIsChecked: boolean;
  katakanaIsChecked: boolean;
  englishIsChecked: boolean;
  spaceIsChecked: boolean;
}

export async function getHiraganaFromApi(apiInput: ApiInput): Promise<string> {

  const lyricStr: string = apiInput.text;
  const YouonIsChecked: boolean = apiInput.youonIsChecked;
  const SokuonIsChecked: boolean = apiInput.sokuonIsChecked;
  const KatakanaIsChecked: boolean = apiInput.katakanaIsChecked;
  const EnglishIsChecked: boolean = apiInput.englishIsChecked;
  const SpaceIsChecked: boolean = apiInput.spaceIsChecked;

  let isYouon = false;
  let isSokuon = false;
  const outputData: string[] = [];
  let counter = 0;
  const normalizedText: string = lyricStr.replace(/\r\n|\r|\n/g, '\n');
  const lyricData: string[] = normalizedText.split('\n');
  const separateList: string[] = [];
  let currentLine = "";
  const currentChar = "";
  let keep = "";
  let keepKatakana = "";
  let keepEng = "";

  try {
    for (const target of lyricData) {
      for (const currentChar of target) {
        isYouon = false;
        isSokuon = false;
        if (/[ャュョヮァィゥェォ]/.test(currentChar) && YouonIsChecked) {
          isYouon = true;
        } else if (currentChar === "ッ" && SokuonIsChecked) {
          isSokuon = true;
        }
        //カタカナの処理
        if (/[ア-ヴｦ-ﾝ]/.test(currentChar) && KatakanaIsChecked) {
          if (keepKatakana === "") {
            keepKatakana = currentChar;
            if (keepEng !== "") {
              currentLine = currentLine + " " + keepEng;
              keepEng = "";
            } else if (keep !== "") {
              separateList.push(keep);
              if (isYouon || isSokuon) {
                currentLine = currentLine + "Ka@" + String(counter) + "￥";
              } else {
                currentLine = currentLine + " Ka@" + String(counter) + "￥";
              }
              counter++;
              keep = "";
            }
          } else {
            if (isYouon || isSokuon) {
              keepKatakana = keepKatakana + currentChar;
            } else {
              keepKatakana = keepKatakana + " " + currentChar;
            }
          }

          //英語の処理
        } else if (/[a-zA-Z]/.test(currentChar) && EnglishIsChecked) {
          if (keepEng === "") {
            keepEng = currentChar;
            if (keepKatakana !== "") {
              currentLine = currentLine + " " + keepKatakana;
              keepKatakana = "";
            } else if (keep !== "") {
              separateList.push(keep);
              if (isYouon || isSokuon) {
                currentLine = currentLine + "Ka@" + String(counter) + "￥";
              } else {
                currentLine = currentLine + " Ka@" + String(counter) + "￥";
              }
              counter++;
              keep = "";
            }
          } else {
            keepEng = keepEng + currentChar;
          }
          //ひらがなとその他の処理
        } else {
          if (keepKatakana !== "") {
            currentLine = currentLine + " " + keepKatakana;
            keep = keep + currentChar;
            keepKatakana = "";
          } else if (keepEng !== "") {
            currentLine = currentLine + " " + keepEng;
            keep = keep + currentChar;
            keepEng = "";
          } else {
            keep = keep + currentChar;
          }
        }
      }

      if (keepKatakana !== "") {
        currentLine = currentLine + " " + keepKatakana;
        keepKatakana = "";
        keep = "";
      } else if (keepEng !== "") {
        currentLine = currentLine + " " + keepEng;
        keepEng = "";
        keep = "";
      } else if (keep !== "") {
        separateList.push(keep);
        if (isYouon || isSokuon) {
          currentLine = currentLine + "Ka@" + String(counter) + "￥";
        } else {
          currentLine = currentLine + " Ka@" + String(counter) + "￥";
        }
        counter++;
        keep = "";
        keepKatakana = "";
      } else {
        currentLine = currentLine + " " + currentChar;
      }

      //先頭から一文字削除
      outputData.push(currentLine);
      currentLine = "";
    }

    const joinedList: string = separateList.join("≒").replace(/,/g, "，");


    let result: string | null = await postDataAsync(joinedList); // ここでAPIを呼び出す
    
    result = result.replace(/ {2,}/g, " ");//スペースが2回続く個所を1回にする

    let convertedData = "";

    //resultを一文字ずつ反復
    for (let currentChar of result) {
      if (
        /[ゃゅょゎぁぃぅぇぉャュョヮァィゥェォ]/.test(currentChar) &&
        YouonIsChecked
      ) {
        isYouon = true;
      } else if (
        currentChar === "っ" ||
        (currentChar === "ッ" && SokuonIsChecked)
      ) {
        isSokuon = true;
      } else if (/^\s*$/.test(currentChar)) {
        currentChar = "";
      }

      if (convertedData && isYouon === false && isSokuon === false) {
        convertedData = convertedData + " ";
      }

      if (!convertedData) {
        convertedData = currentChar;
      } else {
        convertedData = convertedData + currentChar;
      }

      isYouon = false;
      isSokuon = false;
    }


    convertedData = convertedData.replace(/ {2,}/g, " ");
    const convertedList: string[] = convertedData.split("≒");

    //outputDataを改行で結合
    let outputDataStr: string = outputData.join("\n");

    let count = 0;
    for (const convertedLine of convertedList) {
      const regex = new RegExp(`Ka@${count}￥`, 'g');
      outputDataStr = outputDataStr.replace(regex, convertedLine);
      count++;
    }

    if (SpaceIsChecked) {
      outputDataStr = outputDataStr.replace(/ {2,}/g, " ");
    } else {
      outputDataStr = outputDataStr.replace(/ /g, "");
    }

    outputDataStr = outputDataStr.replace(/，/g, ",");
    outputDataStr = outputDataStr.replace(/ (\[\.,;:\/．，；：／@、。!\?"#\$%&'=￥”＃＄％＆！？’＝｜\])/g, "$1");

    const tempOut: string[] = outputDataStr.split('\n');
    for (let i = 0; i < tempOut.length; i++) {
      tempOut[i] = tempOut[i].trim();
    }
    outputDataStr = tempOut.join('\n');

    return outputDataStr;

  } catch (ex) {

    throw ex;

  }
}

async function postDataAsync(joinedList: string): Promise<string> {
  const URL = "https://labs.goo.ne.jp/api/hiragana";
  const appid = "92459f8ae678689f6a463f553c77c7cb3c36e67f8dbffc5d7c8f22c5412e23ea";
  const type = "hiragana";
  const requestData = { app_id: appid, sentence: joinedList, output_type: type };
  const requestContent = JSON.stringify(requestData);

  try {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: requestContent
    });

    if (response.headers.get('Content-Type')?.includes('application/json')) {
      const responseJson = await response.json();
      return responseJson.converted.trim();
    } else {
      return await response.text();
    }
  } catch (ex) {
    if (ex instanceof Error) {
      throw new Error("APIから正常に文字列を取得できませんでした。Rate limit exceededというエラーが表示されている場合は、大変申し訳ありませんが本日のAPI利用上限を超えております。時間をおいてお試しください。" + ex.message);
    } else {
      throw new Error("API接続時に不明なエラーが発生しました。");
    }
  }
}
