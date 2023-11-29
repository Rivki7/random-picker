const tagsEl = document.querySelector('#tags')
const textarea = document.querySelector('#textarea')

textarea.focus()

textarea.addEventListener('keyup', (e) => {
    createTags(e.target.value)

    if (textarea.value.trim() !== "" && e.key === 'Enter') {

        setTimeout(() => {
            e.target.value = ''
        }, 10)
        textarea.disabled = true
        randomSelect()

    } else if (textarea.value.trim() === "" && e.key === 'Enter') {

        e.target.value = ''

    }
})

function createTags(input) {
    const tags = input.split(',').filter(tag => tag.trim() !== '').map(tag => tag.trim())
    tagsEl.innerHTML = ''
    tags.forEach(tag => {
        const tagEl = document.createElement('span')
        tagEl.classList.add('tag')
        tagEl.innerText = tag
        tagEl.addEventListener('click', removeTag)
        tagsEl.appendChild(tagEl)
    });
}

function randomSelect() {
    const times = 30
    const interval = setInterval(() => {
        const randomTag = pickRandomTag()
        highlightTag(randomTag)
        setTimeout(() => {
            unHighlightTag(randomTag)
        }, 100)
    }, 100);

    setTimeout(() => {
        clearInterval(interval)

        setTimeout(() => {
            const randomTag = pickRandomTag()

            highlightTag(randomTag)
        }, 100);
        textarea.disabled = false
    }, times * 100)

}

function pickRandomTag() {
    const tags = document.querySelectorAll('.tag')
    return tags[Math.floor(Math.random() * tags.length)]
}
function highlightTag(tag) {
    tag.classList.add('highlight')
}
function unHighlightTag(tag) {
    tag.classList.remove('highlight')
}

function removeTag() {
   let tag=this.innerText
    
    this.remove();
    
    textarea.value = textarea.value.trim()
    let idx = textarea.value.indexOf(tag)
    if (idx === 0) {
        textarea.value = textarea.value.slice(idx + tag.length)
        textarea.value = textarea.value.trim()
        textarea.value = textarea.value.slice(1)
    } else {
      
       
        let flag=false
        let commaIdx =idx-1
        while (!flag) {
            if (textarea.value[commaIdx] === ',') {
                flag = true
            } else {
                commaIdx--
            }
        }
        textarea.value = textarea.value.slice(0, commaIdx) + textarea.value.slice(idx + tag.length)

        }
    
   
   

   
}