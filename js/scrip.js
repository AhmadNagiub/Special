let BackgrounInterval;

// Local Storage
let mainColor = localStorage.getItem("option-box");
let mainBackground = localStorage.getItem("background-option");
if( mainColor != null)
{
    document.documentElement.style.setProperty("--mainColor" , mainColor);
    document.querySelectorAll(".option-box ul li").forEach(element =>
        {
            element.classList.remove("active");
            if(element.dataset.color === mainColor)
            {
                element.classList.add("active");    
            }
        });
}
let RandomBackground = true ;

if(mainBackground != null)
{
    // remove active from all span
    document.querySelectorAll(".change-background span").forEach(element=>
        {
            element.classList.remove("active");
        });
   // console.log(typeof(mainBackground)) // sting
if(mainBackground === "true")
{
    RandomBackground = true;
    document.querySelector(".yes").classList.add("active");
}
else
{
    RandomBackground = false;
    document.querySelector(".no").classList.add("active");
}
}

//---------------------------------------------------------------------------------------
//Start Settings box
document.querySelector(".setting-box i").addEventListener("click" , function(){

    // toggle class fa-spin to spin i
    this.classList.toggle("fa-spin");
     // toggle class open for settigns box
    document.querySelector(".setting-box").classList.toggle("open");
})

//----------------------------------------------------------------------------------------

//Change main Color
const mainLi = document.querySelectorAll(".setting-box .option-box ul li");

mainLi.forEach(li =>
{
    li.addEventListener("click" ,(e) =>
    {
        // dataset to get the attribute of datacolor :console.log(e.target.dataset.color);
        // --mainColor is in html => documentElmeent
        document.documentElement.style.setProperty("--mainColor" , e.target.dataset.color);
        localStorage.setItem("option-box" ,e.target.dataset.color )
        // removing active class from all(
        handleActive(e)


    })
})
// handle active function
function handleActive(ev)
{
    ev.target.parentElement.querySelectorAll(".active").forEach(element =>
        {
            element.classList.remove("active");
        });
    ev.target.classList.add("active");    
}
//-----------------------------------------------------------------------------------
                    //change backgroud yes or no
let RandomBack = document.querySelectorAll(".change-background span");

//when click on span
RandomBack.forEach( random =>{
random.addEventListener("click",(e)=>
{
                                                    // remove active from all spans
                                                    // e.target.parentElement.querySelectorAll() == RadnomBack
                                                    
                                                    // RandomBack.forEach(element=>{
                                                    //     element.classList.remove("active")
                                                    // })
                                                    // // add active on the element i clicked
                                                    // e.target.classList.add("active")
    handleActive(e)
    if(e.target.dataset.background === "yes")
    {
        RandomBackground = true ;
        RandomizeImages();
        localStorage.setItem("background-option" , true)
    }
    else
    {
        RandomBackground = false ;
        clearInterval(BackgrounInterval);
        localStorage.setItem("background-option" , false)
    }
})
})
//-----------------------------------------------------------------------------------------
                // Start Changing Landing page each 10 Secone
let bckg = document.querySelector(".landing-page");
let ArrayOfImages = ["1.jpg","2.jpg","3.jpg","8.jfif","5.jpg"];

function RandomizeImages()
{
    if(RandomBackground == true)
    {
        BackgrounInterval= setInterval(()=>
        {
            // floor يقرب ل اقرب رقم صحيح 
            // هيطلع ارقام من 0 لحد اخر عنصر في المصفوفه 
            let random = Math.floor(Math.random()*ArrayOfImages.length);
            // هحدد رقم الاندكس ب المتغير اللي هيديني قيمه عشوائيه داخل المصفوفه 
            bckg.style.backgroundImage=`url('images/${ArrayOfImages[random]}')`;
        },10000)//10S
    }

}
RandomizeImages();
// -----------------------------------------------------------------------------------------

// Our Skills 

let ourSkills = document.querySelector(".skills");
let aboutUS = document.querySelector(".aboutUs");
let timeline = document.querySelector(".timeline");

window.onscroll=function()
{
    //Skills offset Top
    //progress
    let skillOffsetTop = ourSkills.offsetTop; // 1072  height above section about
    let skillOuterHeight = ourSkills.offsetHeight; //567 //height of section about

    let aboutTop = aboutUS.offsetTop; // 664
    let aboutHeight = aboutUS.offsetHeight; //382

   // let timelineTop = timeline.offsetTop; // 1666 gallery    timeline==2211
    //let timelineHeight = timeline.offsetHeight; //515 gallery  timeline==1988


    let windowHeight = this.innerHeight; // 654 //height of widnow

    let windowScrollTop = this.pageYOffset;
    if(windowScrollTop >= skillOffsetTop + skillOuterHeight - windowHeight ) //1639-654 == 985
    {
        document.querySelectorAll(".skill-box .skill-progress span").forEach(span=>
            {
                span.style.width = span.dataset.progress;
            })
    }
    //fade in about section
    if(windowScrollTop >= aboutTop + aboutHeight - windowHeight  )
    {
        document.querySelector(".aboutUs .info").style.left="0";
        document.querySelector(".aboutUs .img").style.right="0";
    }
    
    // if(windowScrollTop >= timelineTop + timelineHeight - windowHeight  )
    // {
    //     document.querySelector(".one").style.right="0px";

    //         // document.querySelectorAll(" .right .contetnt").forEach(el2=>
    //         // {
    //         //     el2.style.right="0"
    //         // })
    //         // document.querySelectorAll(" .left .contetnt").forEach(el3=>
    //         // {
    //         //     el3.style.left="0"
    //         // })
    // }
}

// create popup-box from js only // gallery box
// create an array from images to loop them
let imgArray = document.querySelectorAll(".gallery .image-box img");
imgArray.forEach(images=>
    {
        images.addEventListener("click" , (e)=>
        {
            // create popup-overlay
            let popOverlay = document.createElement("div");
            popOverlay.className ="popup-overlay";
            document.body.appendChild(popOverlay);
            //create popup-box
            let popupBox = document.createElement("div");
            popupBox.className ="popup-Box";
            document.body.appendChild(popupBox);

            //create image and append it to popupBox
            let img = document.createElement("img");
            img.src = images.src;
            popupBox.appendChild(img);
          //create h2
            if(images.alt !== null)
            {
            let head = document.createElement("h2");
            let text = document.createTextNode(images.alt);
            head.appendChild(text);
            popupBox.prepend(head);
            }
            // craete p
            let pargraph = document.createElement("p");
            let text2 = document.createTextNode("Lorem, ipsum dolor sit amet consectetur adipisicing elit.");
            pargraph.appendChild(text2);
            popupBox.appendChild(pargraph);
            //create ExitButton
            let btn = document.createElement("span");
            let text3 = document.createTextNode("X");
            btn.appendChild(text3);
            btn.className="btn-exit";
            popupBox.appendChild(btn);
        })
    })
document.addEventListener("click",function(e)
{
    if(e.target.className == "btn-exit")
    {
        e.target.parentElement.remove();
        document.querySelector(".popup-overlay").remove();
    }
})
//--------------------------------------------------------------------------------------
//Nav Bullets
//select all bullets
const AllBullets = document.querySelectorAll(".nav-bullets .bullets");
const AllLinks = document.querySelectorAll(".links li a");

function ScrollToSomeWhere(elements)
{
    elements.forEach(element =>{
        element.addEventListener("click" , (e)=>{
            e.preventDefault(); // بمنع سلوك اللينك انه ميودميش ف صفحه بخليه يوديني ل سكشن
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior:"smooth"
            });
        })
    })
}
ScrollToSomeWhere(AllBullets);
ScrollToSomeWhere(AllLinks);
//--------------------------------------------------------------------------------------

let opt_bullet = localStorage.getItem("option-bullet");

//bullets
let bullets = document.querySelectorAll(".change-bullets span");
bullets.forEach(bullet=>{
    bullet.addEventListener("click" , function(e)
    {
        if(e.target.dataset.bullet === "block")
        {
            document.querySelector(".nav-bullets").style.display="block";
            localStorage.setItem("option-bullet" , "block");
        }
        else
        {
            document.querySelector(".nav-bullets").style.display="none";
            localStorage.setItem("option-bullet" , "none");
        }
        handleActive(e)
    })
})

// bullets for localstorage
if(opt_bullet !== null)
{
    document.querySelectorAll(".change-bullets span").forEach(element=>
        {
            element.classList.remove("active");
        });
        if(opt_bullet === "block")
            {
                document.querySelector(".nav-bullets").style.display="block";
                document.querySelector(".change-bullets .yes").classList.add("active");
            }
        else
            {
                document.querySelector(".nav-bullets").style.display="none";
                document.querySelector(".change-bullets .no").classList.add("active");
            }
}

//------------------------------------------------------------------------------------
//Reset option
document.querySelector(".reset-option").addEventListener("click" , function(){
     //   localStorage.clear();
     // دي هتقوم بالواجب بس عيبها لو في حاجه تبع الموقع هتتشال معاها و احتمال مكونش عايز كدا فهعمل كل زاحده لوحدها
    //بعد ما نحذف لازم اعاده تشغيل عشان يبان التغيير اللي عملته

    localStorage.removeItem("option-box");        //for color
    localStorage.removeItem("background-option"); //for backgrouds 
    localStorage.removeItem("option-bullet");     //for bullets nav

    window.location.reload(); // For Reloading
});
//-------------------------------------------------------------------------------------
//toglle button 
let toggleBtn = document.querySelector(".toggle-element");
let Links = document.querySelector(".links");
toggleBtn.addEventListener("click" , (e)=>
{
    Links.classList.toggle("open");
    toggleBtn.classList.toggle("menu-active");

    // to stop propagation 
    // يعني عايز العنصر يشمل ابنائه عشان لما اضغط علي حاجه ميكونش منفصل عن الاب
    e.stopPropagation();
})
Links.addEventListener("click" , function(e){
    e.stopPropagation();
})

// to click on anything to close toggle menu
document.addEventListener("click" , (e)=>{
    if(e.target !==toggleBtn && e.target !==Links  )
    {
        if(Links.classList.contains("open")) // to ensure it will be open when i click outside
        {
            Links.classList.toggle("open");
            toggleBtn.classList.toggle("menu-active"); 
        }
    }
})