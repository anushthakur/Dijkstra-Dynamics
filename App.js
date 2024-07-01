const board=document.getElementById('board');

var cells; //At this point, the variable cells is declared but not yet initialized with a value, so its value is undefined.
let row,col;
var matrix;

let source_coordinate;
let target_coordinate;


renderBoard();//This is because function declarations are hoisted to the top of their scope, which means that the JavaScript engine moves the function declaration to the top of the script, regardless of where it's written. This allows you to call the function before it's declared.

// document.createElement('div'): This method creates a new HTML element of the type specified in the parentheses, in this case, a div element.
// const rowElement: This declares a new constant variable named rowElement to store the reference to the newly created div element.
//rowElement.classList: This accesses the classList property of the rowElement, which is a special object with methods to manipulate the element's classes.
//.add('row'): This method adds the class name 'row' to the element's list of classes. If the class 'row' is not already present, it will be added. If it is already present, nothing will happen.




function renderBoard(cellWidth = 22)
{
    
    const root=document.documentElement;
    root.style.setProperty('--cell-width',`${cellWidth}px`); 

    row=Math.floor(board.clientHeight/cellWidth); //Math.floor(): This is a built-in function that returns the largest integer less than or equal to a given number.
    col=Math.floor(board.clientWidth/cellWidth);

    board.innerHTML='';


    cells=[]; //assigning an empty array
    //Now, cells is an array, specifically an empty array, ready to hold elements.

    matrix = []; //matrix ko harbaar empty karna hoga
    

    for(let i=0;i<row;i++)
    {
        const rowArr = []; //Even though const is used, which means the variable row itself cannot be reassigned to a different value, the contents of the array can still be modified. 
        const rowElement=document.createElement('div');
        rowElement.classList.add('row');
        rowElement.setAttribute('id',`${i}`);

        for(let j=0;j<col;j++)
            {
                const colElement=document.createElement('div');
                colElement.classList.add('col');
                colElement.setAttribute('id',`${i}-${j}`);

                cells.push(colElement); //array mein saare cells ka record rahe taki
                rowArr.push(colElement);

                rowElement.appendChild(colElement);
            }

            matrix.push(rowArr);

            board.appendChild(rowElement);
    }

    source_coordinate = set('source');
    target_coordinate = set('target');
    boardInteraction(cells); //pixel change hota hai toh purane source,target vale cells naye random source,target vale cells se replace ho jate hain.
    //aur drag vala eventListener humne purane source,target cells par laga rakha tha,par pixelchange hote hi purane source,target cells replace ho gye naye source,target cells se jinka size bhi different hai....isliye drag karke position badalne ka option nhi de rha tha.
    //SOLUTION: jab bhi board render ho rha hai, event listener laga do source aur target par taaki unki position badali ja sake user ke anusar.
}





//=================================================
//querySelectorAll() is used specifically when you want to select multiple elements that match a given CSS selector. 
const navOptions=document.querySelectorAll('.nav-menu>li>a');

var dropOptions=null;

const removeActive=(elements,parent=false)=>{
    elements.forEach((element)=>{
        if(parent)
        {
            element=element.parentElement;
        }
        element.classList.remove('active');
    });
}

navOptions.forEach((navOption) =>
    {
        navOption.addEventListener('click',()=>{
        const li=navOption.parentElement;
        //ek time par ek hi active dikhna chahiye ,toh pehle ke saare active pehle undo karo

        if(li.classList.contains('active'))
            {
                li.classList.remove('active');
                return;
            }
        removeActive(navOptions,true);
        li.classList.add('active');

        if(li.classList.contains('drop-box'))
            {
                dropOptions=li.querySelectorAll('.drop-menu>li');

                toggle_dropOption(navOption.innerText);
            }

        });
    }
    //You attach an event handler function to a specific DOM element using the addEventListener method or by assigning an on[event] property (like onclick, onmouseover, etc.).

    //The forEach method iterates over each element in the navOptions array (or array-like object) and executes the arrow function once for each element. During each iteration, the current element from the array is passed as an argument to the arrow function.Here, navOption is the name of the parameter of the arrow function.
    //addEventListener is a method that attaches an event handler function () => { ... } to the selected element  (navOption in this case).
    //The event being listened for is a click event. When a user clicks on navOption, the function inside addEventListener will execute.
    //navOption.parentElement retrieves the parent element of navOption.
    //classList is a property that allows manipulation of classes on an element.
    //add('active') adds the class 'active' to the parent element.
    //This assumes that adding the class 'active' will trigger CSS rules that visually indicate the active state of the list item.

);




//===================
let pixelSize=22; //by default
let speed='normal'; //be default
let algorithm="Dijkstra's";

const visualizeBtn=document.getElementById('Visualize');

function toggle_dropOption(target)
{
    dropOptions.forEach((dropOption)=>{
        dropOption.addEventListener('click',()=>{
            removeActive(dropOptions);
            dropOption.classList.add('active');

            if(target === 'Pixel')
                {
                    pixelSize = +dropOption.innerText.replace('px','');
                    //replace 'px' with empty string
                    renderBoard(pixelSize);
                    //par purane ke saath append ho rha hai,toh pehle board clear hona chahiye
                }
            else if(target === 'Speed')
                {
                    speed=dropOption.innerText;
                }
            else if(target === 'Algorithm')
            {
                algorithm=dropOption.innerText.split(' ')[0];

                visualizeBtn.innerText=`visualize ${algorithm}`;
            }    
            
            removeActive(navOptions,true);

        });
    });
}


//=============
/*
document.addEventListener('click',(e)=>{
    console.log(e.target);
});
*/
//In JavaScript, when an event like click occurs, an event object is automatically created and passed as an argument to the event handler function.
//Inside this handler, e (or event) is the event object that contains information about the event itself.
// e.target represents the HTML element that was clicked on to trigger the event.

//target is indeed a property of the event object (e in your case).

//The target property of the event object refers to the element on which the event was originally fired. In other words, it identifies the specific HTML element that triggered the event. This property is very useful in event handling because it allows you to determine exactly which element the user interacted with.

//This is useful because it allows you to determine which specific element on the page was interacted with, which can be important for handling user interactions, such as triggering specific actions or updating specific parts of the page dynamically based on where the user clicked.




document.addEventListener('click',(e)=>{
    const navMenu=document.querySelector('.nav-menu');
    if(!navMenu.contains(e.target))
        {
            removeActive(navOptions,true);
        }
});


//=============== BOARD INTERACTION ======================

//Math.ceil() will always produce a number equal to or greater than the input.
// Math.floor() will always produce a number equal to or less than the input.

//In JavaScript, the Math.random() function is used to generate a pseudo-random floating-point number between 0 (inclusive) and 1 (exclusive). It's part of the Math object, which provides mathematical constants and functions for performing mathematical tasks in JavaScript.

//In JavaScript, Math is a built-in object that provides a set of mathematical functions and constants. It's not a variable or a function itself, but rather a namespace that contains various mathematical functions and properties.

function isValid( x , y)
{
    return (x>=0 && y>=0 && x<row && y<col);
}

function set(className,x = -1, y = -1)
{
    if(isValid(x,y))
        {
            matrix[x][y].classList.add(className);
        }
    else 
        {
            x=Math.floor(Math.random()*row);
            y=Math.floor(Math.random()*col);

            matrix[x][y].classList.add(className);
        }


        return {x,y}; //object
    
}



//In JavaScript, the pointerdown event is used to detect when a pointer (such as a mouse, pen, or touch contact) makes contact with the surface of a target element.

let isDragging=false;
let isDrawing=false;
let dragPoint=null;

function boardInteraction(cells)
{
cells.forEach((cell)=>{

    

    const pointerdown=(e)=>{

        if(e.target.classList.contains('source') )
            {
                isDragging=true;
                dragPoint='source';
            }
        else if (e.target.classList.contains('target'))
            {
                isDragging=true;
                dragPoint='target';
            }    
        else
            {
                isDrawing=true;
            }    

    };

    const pointerup=()=>{
        isDragging=false;
        isDrawing=false;
        dragPoint=null;
    };

    const pointermove=(e)=>{

        if(isDrawing)
            {
                e.target.classList.add('wall');
            }
        else if(dragPoint && isDragging)
            {
                cells.forEach((cell)=>{
                    cell.classList.remove(`${dragPoint}`);
                })
                e.target.classList.add(`${dragPoint}`);

                coordinate=e.target.id.split('-');

                if(dragPoint === 'source')
                    {
                        source_coordinate.x= +coordinate[0];
                        source_coordinate.y= +coordinate[1];
                    }
                else
                    {
                        target_coordinate.x= +coordinate[0];
                        target_coordinate.y= +coordinate[1];
                    }    
            }
    };

    cell.addEventListener('pointerdown',pointerdown);
    cell.addEventListener('pointermove',pointermove);
    cell.addEventListener('pointerup',pointerup);
    cell.addEventListener('click',()=>{
        cell.classList.toggle('wall'); //In JavaScript, toggle() is a method that toggles the presence of a specified class or classes on an element's class list. It's a part of the DOMTokenList interface, which is a collection of DOM tokens, such as classes, IDs, and attributes.

        //The toggle() method of classList is used to toggle a class for an element. When invoked, it checks if the class exists in the element's class list:

        //If the class exists, toggle() removes it.
        //If the class does not exist, toggle() adds it.
    });
});
}



//====================

const clearPathBtn = document.getElementById('clearPath');
const clearBoardBtn = document.getElementById('clearBoard');

//In JavaScript, functions cannot be called directly by their name without using parentheses. The parentheses () are necessary to invoke or call a function. When you refer to a function by its name without parentheses, you are referencing the function object itself, not executing it.

clearPathBtn.addEventListener('click',clearPath);//In the statement clearPathBtn.addEventListener('click', clearPath);, the function clearPath is not being invoked immediately. Instead, it is being passed as a reference to the event listener. This means that the clearPath function will be called (invoked) whenever the 'click' event occurs on the clearPathBtn element.
clearBoardBtn.addEventListener('click',clearBoard);

function  clearPath(){
    cells.forEach((cell)=>{
        cell.classList.remove('visited');
        cell.classList.remove('path');
    });
}

function clearBoard(){
    cells.forEach((cell)=>{
        cell.classList.remove('visited');
        cell.classList.remove('wall');
        cell.classList.remove('path');
    });
}


//========================================================

//==========DIJKSTRA'S ALGORITHM====================


//In JavaScript, you don't declare variables using let or var inside the class body directly for instance properties. Instead, you initialize instance properties within the constructor using this.

//The class body contains the properties and methods of the class. Properties are data members, and methods are functions that operate on that data.


//==============
// Complete Binary Tree: A binary heap is a complete binary tree, meaning all levels are fully filled except possibly the last level, and the last level has all nodes as left as possible.

//upHeapify is used when element is added and downHeapify is used when element is deleted.

 class PriorityQueue
 {
    constructor()
    {
        this.elements=[];  //In JavaScript, the keyword this inside a class represents the current instance of that class. When a method or property of the class is accessed, this refers to the specific object that is calling the method or accessing the property.
        this.length=0;
    }

    swap(x,y) //index hain x aur y,array ki values swap karni hain
    {
        //destructuring
        [this.elements[x],this.elements[y]] = [this.elements[y],this.elements[x]];
    }

    push(data)
    {
        this.elements.push(data); //The push() method adds one or more elements to the end of an array and returns the new length of the array.
        this.length++;
        this.upHeapify(this.length-1); //data hamara last index par hoga
    }

    pop()
    {
        let n = this.length - 1;
        this.swap(0,n); //first element ko last element ke saath swap kar liya....aur fir first element ko remove/pop kar lenge....as chahe koi bhi heap ho (min ya max) pop hone vala element hamesha root hi hota hai...as that has the highest priority depending upon the nature of the heap.
        //In a heap (whether min-heap or max-heap), the element with the highest priority is always at the root, which is the first element of the heap array.

        //Swap the root element (first element in the array) with the last element of the heap.
        //Remove (or pop) the last element, which was originally the root. This effectively reduces the size of the heap by one.
        const popped = this.elements.pop(); //The pop() method removes the last element from an array and returns that element. This method changes the length of the array.
        this.length--;

        this.downHeapify(0); //passing index....

        //Downheapify: Restore the heap property by performing the downheapify() or "sift down" operation starting from the root. This involves comparing the new root with its children and swapping it with the larger (in max-heap) or smaller (in min-heap) child until the heap property is restored.

        return popped;


    }

    upHeapify(i) 
    {
        //a function used in the context of heap data structures, specifically in the process of maintaining the heap property when a new element is added.
        //When an element is added to a heap, it is typically placed at the end of the heap (the next available leaf position). However, this new element might violate the heap property. To restore the heap property, the upheapify() function (also known as "bubble up" or "sift up") is used. This function repeatedly compares the added element with its parent and swaps them if the heap property is violated. This process continues until the heap property is restored or the element reaches the root of the heap.

        //base case
        if(i===0)
            {
                return;
            }
        const parentIdx = Math.floor((i-1)/2);

        if(this.elements[i].cost<this.elements[parentIdx].cost)
            {
                this.swap(i,parentIdx);
                this.upHeapify(parentIdx);
            }    

    }

    downHeapify(i)
    {
        //parent apne left aur right child se khud ko compare karta hai.
        //jo child sabse minimum hota hai out of left and right,usse vo khud ko swap kar leta hai aur aiasa tab tak karta rehta hai jab tak heap ki property restore nhi ho jati.

        let minNode=i; //shuru mein ith index ko hi min maan liya
        const leftIdx=(2*i)+1;
        const rightIdx=(2*i)+2;

        if(leftIdx<this.length && this.elements[leftIdx].cost<this.elements[minNode].cost)
            {
                minNode=leftIdx;
            }
        if(rightIdx<this.length && this.elements[rightIdx].cost<this.elements[minNode].cost)
            {
                 minNode=rightIdx;
            } 
            
        if(minNode !== i)
            {
                this.swap(minNode,i);
                this.downHeapify(minNode);
            }    

    }

    isEmpty()
    {
        return this.length === 0;
    }

    
 }





 /*
 const array = [1, 2, 3, 4];
const [a, , b] = array;

console.log(a); // 1
console.log(b); // 3

// Attempt to reassign values of `a` and `b`
[a, b] = [5, 6]; // This will cause an error

console.log(a); // Error: Assignment to constant variable.
console.log(b); // Error: Assignment to constant variable.
*/



var pathToAnimate;
var visitedCell; //kaunse kaunse blue hone hai uske liye

function getPath(parentMap,target)
{
    //base case
    if(!target)
        {
            return; //map mein entry nhi hai....source ka parent milega hi nhi
            //undefined ka NOT is true.
        }
     pathToAnimate.push(matrix[target.x][target.y]);
     
     const p = parentMap.get(`${target.x}-${target.y}`);

     getPath(parentMap,p);
}


function animate(elements , className)
{
    let delay=10;

    if(className === 'path')
        {
            delay *= 3.5; //yellow path should stay for sometime
        }

    for(let i=0;i<elements.length;i++)
        {
            setTimeout(()=>{
                elements[i].classList.remove('visited');
                //kyonki yellow path tab tak nhi dikhega jab tak blue nhi hatega.

                elements[i].classList.add(className);

                if(i === elements.length-1 && className === 'visited')
                    {
                        animate(pathToAnimate,'path');
                    }
            }, delay*i);
        }
}







function DijkstraAlgo()
{
    const pq = new PriorityQueue();
    const parentMap = new Map(); //path ke liye

    const distance = []; //2D matrix

    for( let i=0;i<row;i++)
        {
            const INF = []; //empty array

            for( let j=0;j<col;j++)
                {
                    INF.push(Infinity);
                }
            distance.push(INF);  
        }

    
        distance[source_coordinate.x][source_coordinate.y]=0;
        pq.push({coordinate:source_coordinate, cost:0});

        while(!pq.isEmpty())
        {
            const {coordinate:current,cost:distanceCurr} = pq.pop();
            visitedCell.push(matrix[current.x][current.y]);

            //target mil gya

            if(current.x === target_coordinate.x && current.y === target_coordinate.y)
                {
                    getPath(parentMap,target_coordinate);
                    return; //ab neeche ka kuch execute na ho.
                }

            const neighbours = [
                {x: current.x - 1 ,y: current.y}, //TOP
                {x: current.x , y: current.y + 1}, //RIGHT
                {x: current.x + 1, y: current.y}, //BOTTOM 
                {x: current.x ,y: current.y - 1} //LEFT
            ];    

            //adjacent neighbours ko traverse karo
            for( const neigh of neighbours)
                {
                    const key = `${neigh.x}-${neigh.y}`;
                    //valid cell(not out of bounds) hai aur wall nhi hai vo cell
                    if(isValid(neigh.x,neigh.y) && !matrix[neigh.x][neigh.y].classList.contains('wall'))
                        {
                            //assuming edge weight to be 1.
                            const edgeWgt=1;
                            const distanceToNeigh = distanceCurr + edgeWgt;

                            if(distanceToNeigh < distance[neigh.x][neigh.y])
                                {
                                    //relaxation
                                    distance[neigh.x][neigh.y] = distanceToNeigh;
                                    pq.push({coordinate:neigh,cost:distanceToNeigh});
                                    parentMap.set(key,current); //node aur uska parent jahan se aaye hai us node par 

                                }
                        }
                }
        }
        


}




visualizeBtn.addEventListener('click',()=>{
    clearPath();
    visitedCell = [];
    pathToAnimate = [];

    //DijkstraAlgo();

    switch (algorithm)
    {
        case 'BFS':
            break;
        case "Dijkstra's" :
            DijkstraAlgo();
            break;
        case'DFS':
            break;       
    }
    
    animate(visitedCell,'visited');
});


/*
What is a preflight call?

A preflight call, also known as a preflight request, is an optional request that the browser sends to the server before making the actual request. The preflight request is used to determine whether the server allows the actual request to be made.

The preflight request is sent as an OPTIONS request, and it includes the following headers:

Access-Control-Request-Method: The method of the actual request (e.g., GET, POST, etc.)
Access-Control-Request-Headers: The headers that will be included in the actual request
The server responds to the preflight request with an Access-Control-Allow-Methods header, specifying which methods are allowed, and an Access-Control-Allow-Headers header, specifying which headers are allowed.

What is a header?

In HTTP, a header is a key-value pair that is sent with the request or response. Headers provide additional information about the request or response, such as the type of data being sent, the authentication credentials, or the caching instructions.

Some common headers include:

Content-Type: Specifies the type of data being sent (e.g., application/json, text/html, etc.)
Authorization: Specifies the authentication credentials (e.g., Bearer token, Basic username:password, etc.)
Accept: Specifies the type of data that the client can handle (e.g., application/json, text/html, etc.)
Step-by-step process of following CORS policy:

Here is the step-by-step process of following CORS policy:

Step 1: Client makes a request

The client (e.g., a web page) makes a request to a server (e.g., https://api.example.net) using a method (e.g., GET, POST, etc.) and includes headers (e.g., Content-Type, Authorization, etc.).

Step 2: Browser checks for same-origin policy

The browser checks whether the request is to the same origin (i.e., the same domain, protocol, and port) as the web page. If it is, the request is allowed.

Step 3: Browser sends preflight request (optional)

If the request is not to the same origin, the browser sends a preflight request to the server. The preflight request is an OPTIONS request that includes the following headers:

Access-Control-Request-Method: The method of the actual request (e.g., GET, POST, etc.)
Access-Control-Request-Headers: The headers that will be included in the actual request
Step 4: Server responds to preflight request

The server responds to the preflight request with an Access-Control-Allow-Methods header, specifying which methods are allowed, and an Access-Control-Allow-Headers header, specifying which headers are allowed.

Step 5: Browser checks preflight response

The browser checks the preflight response to determine whether the server allows the actual request to be made. If the server allows the request, the browser proceeds to make the actual request.

Step 6: Browser makes actual request

The browser makes the actual request to the server, including the headers specified in the preflight request.

Step 7: Server responds to actual request

The server responds to the actual request, including the Access-Control-Allow-Origin header, which specifies which domains are allowed to make requests.

Step 8: Browser checks actual response

The browser checks the actual response to determine whether the server allows the request. If the server allows the request, the browser returns the response to the client.


//=================================

The error message you're seeing is related to Cross-Origin Resource Sharing (CORS) policy. CORS is a security feature implemented by web browsers that restricts web pages from making requests to a different domain than the one that served the web page. This is done to prevent malicious websites from making requests to other websites on behalf of the user without their knowledge.

In your case, the error message is saying that the request to 'https://sider.ai/api/v1/app/config?app\_name=ChitChat\_Chrome\_Ext&app\_version=4.12.1&tz\_name=Asia/Calcutta' from the origin 'http://127.0.0.1:5500' has been blocked by CORS policy. This is because the server at 'https://sider.ai' has not included the 'Access-Control-Allow-Origin' header in its response, which is required to allow cross-origin requests.

The error message also indicates that the request failed with a net::ERR_FAILED error. This means that the request was not successful and did not receive a valid response from the server.
*/

//==================================

