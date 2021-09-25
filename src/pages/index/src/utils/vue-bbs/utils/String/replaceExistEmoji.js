import emojiData from '../../assets/emoji.json'
// 尽可能匹配更多的表情
// 例如 :catt:cat:  结果为:catt🐱

export default function replaceExistEmoji(value,selectionStart,str=''){
  let startPos=selectionStart
  let text='',newStr=str,open=false
  for(let i=0;i<value.length;i++){
    newStr+=value[i]
    if(value[i]===":" && open){
      if(emojiData[text]){
        startPos-=text.length
        startPos+=1
        newStr=newStr.substring(0,newStr.length-text.length-2)
        newStr+=emojiData[text]
        open=false
      }
      text=''
    }else if(value[i]===":" && !open){
      open=true
      text=''
    }else{
      if(open)text+=value[i]
    }
  }
  return [newStr,startPos]
}
