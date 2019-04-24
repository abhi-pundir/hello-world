 const getNotes= function(){
     return 'Your notes...'
 }
// module.exports= getNotes

const fs= require('fs')
const chalk= require('chalk')

addNotes= function(title, body){
    const notes= loadNotes()
    const duplicateNotes= notes.filter(function(note){
        return note.title=== title
    })

    if (duplicateNotes.length==0){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green('New note added'))
    }
    else{
        console.log(chalk.red('Note title taken'))
    }
}

saveNotes= function(notes){
    const notesJSON= JSON.stringify(notes)
    fs.writeFileSync('notes.json',notesJSON)
}


loadNotes= function(){
    try{
    const dataBuffer= fs.readFileSync('notes.json')
    const dataJSON= dataBuffer.toString()
    const dataString= JSON.parse(dataJSON)    
    return dataString
    }
    catch(e){
        return []
    }
}

removeNote= function(title){
    notes= loadNotes()
    const deleteCount=0
    remainingNotes= notes.filter(function (note){
        return note.title !== title
    });
    if (notes.length>=remainingNotes.length){
        console.log(chalk.red.inverse('No note removed'))
    }
    else{
        console.log(chalk.green.inverse('Note removed'))
        saveNotes(remainingNotes)
    }
    
}

module.exports={
    getNotes: getNotes,
    addNotes: addNotes,
    removeNote: removeNote
}