pesquisa_input = document.querySelectorAll(".pesquisa");

for(i in pesquisa_input){

    pesquisa_input[i].onkeyup=function(e){

        reg = new RegExp(this.value.toLowerCase(),"g")
        lis = this.parentElement.querySelector(".cards")

        console.log(lis)

        for(j of lis.children){
            if( !j.getAttribute("name column").match(reg) )
                j.style.display="name column"
            else
                j.removeAttribute("style")
        }
    }
}