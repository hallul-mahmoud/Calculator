let operation = document.querySelector(".output");
let result = document.querySelector(".result");
let btns=document.querySelectorAll("button");
let infix=[];
let postfix=[];
let opStack=[];
let resStack=[];
let eqFlag=0;

function percedence(op){
    if(op=="*" || op=="/"){
        return 1;
    }else
    {
        return 0;
    }
}

btns.forEach(function(btn){
    btn.onclick = function(e){
        if(e.currentTarget.id == "clear")
        {
            operation.textContent="";
            result.textContent="";
            infix=[];
            postfix=[];
            eqFlag=0;
        }
        else if(e.currentTarget.id == "delete")
        {
            if(eqFlag==1){
                operation.textContent = "";
                infix=[];
                eqFlag=0;
            }
            else{
            operation.textContent = operation.textContent.slice(0,-1);
            if(infix.length > 0){
                infix[infix.length - 1] = infix[infix.length - 1].slice(0,-1);
                if(infix[infix.length - 1] == ""){
                infix.pop();
                }
            }
            }

        }
        else if(e.currentTarget.classList.contains("num")){
            operation.textContent = operation.textContent + e.currentTarget.textContent;
            if(isNaN(infix.at(-1)) || infix.length==0){
                infix.push(String(e.currentTarget.textContent));
            }
            else{
                infix[infix.length - 1] = String(infix.at(-1) + e.currentTarget.textContent);
            }
        }
        else if(e.currentTarget.classList.contains("op")){
            switch(e.currentTarget.id){
                case "percentage":
                    infix.push("%");
                    if(eqFlag==1){
                        operation.textContent=result.textContent + "%";
                        eqFlag=0;
                    }
                    else{
                    operation.textContent = operation.textContent + "%";
                    }
                    break;
                case "divide":
                    infix.push("/");
                    if(eqFlag==1){
                        operation.textContent=result.textContent + "÷"; 
                        eqFlag=0;                       
                    }
                    else{
                    operation.textContent = operation.textContent + "÷";
                    }
                    break;
                case "mul":
                    infix.push("*");
                    if(eqFlag==1){
                        operation.textContent = result.textContent + "×";
                        eqFlag=0;
                    }
                    else{
                    operation.textContent = operation.textContent + "×";
                    }
                    break;
                case "plus":
                    infix.push("+");
                    if(eqFlag==1){
                        operation.textContent = result.textContent + "+";
                        eqFlag=0;
                    }
                    else{
                    operation.textContent = operation.textContent + "+";
                    }
                    break;
                case "minus":
                    infix.push("-");
                    if(eqFlag==1){
                        operation.textContent = result.textContent + "-";
                        eqFlag=0;
                    }
                    else{
                    operation.textContent = operation.textContent + "-";
                    }
                    break;
            }
            if(eqFlag==1){
                screen.textContent=result.textContent;
                eqFlag=0;
            }
        }else if(e.currentTarget.id=="equal")
        {
            for(let i=0; i<infix.length; i++)
            {
                if(isNaN(infix[i])){
                    if(opStack.length==0){
                        opStack.push(infix[i])
                    }
                    else{
                        if(percedence(opStack.at(-1)) >= percedence(infix[i]))
                        {
                            postfix.push(opStack.pop());
                            opStack.push(infix[i]);
                        }
                        else
                        {
                            opStack.push(infix[i]);
                        }
                    }
                }
                else
                {
                    postfix.push(infix[i]);
                }
            }
            while(opStack.length>0)
            {
                postfix.push(opStack.pop());
            }
            for(let i=0; i<postfix.length;i++){
                if(isNaN(postfix[i]))
                {
                    let op=postfix[i];
                    let num1,num2;
                    switch(op){
                        case "%":
                            num1=parseFloat(resStack.pop());
                            resStack.push(num1/100);
                            break;
                        case "/":
                            num1=parseFloat(resStack.pop());
                            num2=parseFloat(resStack.pop());
                            resStack.push(num2/num1);
                            break;
                        case "*":
                            num1=resStack.pop();
                            num2=resStack.pop();
                            resStack.push(num1*num2);
                            break;
                        case "+":
                            num1=resStack.pop();
                            num2=resStack.pop();
                            resStack.push(num1+num2);
                            break;
                        case "-":
                            num1=resStack.pop();
                            num2=resStack.pop();
                            resStack.push(num2-num1);
                            break;
                    }
                }
                else
                {
                    resStack.push(parseFloat(postfix[i]));

                }
            }
            postfix=[];
            let finalRes=resStack.pop();
            infix=[finalRes];
            result.textContent=`${finalRes}`;
            eqFlag=1;
        }
    };
})