export interface ConvertInput {
  text: string;
  convertSwitch: Record<string, string>;
  convertStockHaWa: string[];
  convertStockHeE: string[];
  strA: string;
  strB: string;
}

export interface ConvertOutput {
  text: string;
  convertSwitch: Record<string, string>;
  convertStockHaWa: string[];
  convertStockHeE: string[];
  buttonTextHaWa: string;
  buttonTextHeE: string;
}

export async function convertString(
  convertInput: ConvertInput,
  dialog: (message: string, title: string, isTwoButtons?: boolean) => Promise<boolean>,
): Promise<ConvertOutput> {

  const normalizedText: string = convertInput.text.replace(/\r\n|\r|\n/g, '\n');
  const convertSwitch: Record<string, string> = convertInput.convertSwitch;
  let convertStockHaWa: string[] = convertInput.convertStockHaWa;
  let convertStockHeE: string[] = convertInput.convertStockHeE;
  const strA: string = convertInput.strA;
  const strB: string = convertInput.strB;

  let convertList: string[] = [];
  let convertStock: string[] = [];

  if (strA === "は") {
    convertStock = convertStockHaWa;
  } else {
    convertStock = convertStockHeE;
  }

  if (convertSwitch[strA] === ""|| convertSwitch[strA] === undefined) {
    for (const strC of normalizedText) {
      if (strC === strA) {
        convertList.push(strB);
        convertStock.push(strA);
      } else if (strC === strB) {
        convertList.push(strB);
        convertStock.push(strB);
      }
    }
    convertSwitch[strA] = strA;
  } else {
    for (const strC of normalizedText) {
      if (strC === strA) {
        if (convertSwitch[strA] === strB) {
          convertList.push(strB);
        } else {
          convertList.push(strA);
        }
      } else if (strC === strB) {
        if (convertSwitch[strA] === strA) {
          convertList.push(strA);
        } else {
          convertList.push(strB);
        }
      }
    }

    if (convertList.length !== convertStock.length) {
      const overwrite = await dialog('[' + strA + ']と[' + strB + ']の合計数が前回の変換時と異なります。再変換しますか？', 'Confirmation', true);

      if (overwrite) {
        convertStock = [];
        for (const strC of normalizedText) {
          if (strC === strA) {
            convertStock.push(strA);
          } else if (strC === strB) {
            convertStock.push(strB);
          }
        }
      }else{
        const output: ConvertOutput = {
          text: "",
          convertSwitch: convertSwitch,
          convertStockHaWa: convertStockHaWa,
          convertStockHeE: convertStockHeE,
          buttonTextHaWa: "",
          buttonTextHeE: "",
        };
        return output;
      }
    }

    let counter = 0;
    const tempList: string[] = [...convertList];
    for (const strC of convertList) {
      if (strC === strA) {
        if (convertStock[counter] === strB && convertSwitch[strA] === strA) {
          tempList[counter] = strB;
        }
      }
      counter++;
    }
    convertList = tempList;

    if (convertSwitch[strA] === strB) {
      convertSwitch[strA] = strA;
    } else {
      convertSwitch[strA] = strB;
    }
  }

  const outputList: string[] = [];
  let outputDataStr = "";

  let counter = 0;
  for (const strC of normalizedText) {
    if (strC === strA || strC === strB) {
      outputList.push(convertList[counter]);
      counter++;
    } else if (strC === ""|| strC === undefined) {
      outputList.push("\t");
    } else {
      outputList.push(strC);
    }
  }

  let buttonTextHaWa = "";
  let buttonTextHeE = "";

  if (strA === "は") {
    convertStockHaWa = convertStock;
    if (convertSwitch[strA] === strA) {
      buttonTextHaWa = "[" + strB + "]→" + strA;
    } else {
      buttonTextHaWa = "[" + strA + "]→" + strB;
    }
  } else {
    convertStockHeE = convertStock;
    if (convertSwitch[strA] === strA) {
      buttonTextHeE = "[" + strB + "]→" + strA;
    } else {
      buttonTextHeE = "[" + strA + "]→" + strB;
    }
  }

  outputDataStr = outputList.join("");
  outputDataStr = outputDataStr.replace(/\t/g, '\n');

  const output: ConvertOutput = {
    text: outputDataStr,
    convertSwitch: convertSwitch,
    convertStockHaWa: convertStockHaWa,
    convertStockHeE: convertStockHeE,
    buttonTextHaWa: buttonTextHaWa,
    buttonTextHeE: buttonTextHeE,
  };

  return output;
}