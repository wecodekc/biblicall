const assets = Runtime.getAssets();
const bookAsset = assets['/json/psalms.json']; 
const bookPath = bookAsset.path;
const book = require(bookPath);

exports.getVerse = (chapter, verse) => {
    
    const chapterIndex = chapter - 1;
    const verseIndex = verse - 1;
  
    if (chapterIndex >= book.chapterCount) {
        return {
            chapter: chapter,
            verse: verse,
            error: true,
            message: "Not a chapter in Psalms."
        };
    }
  
    if (verseIndex >= book.verseCounts[chapterIndex]) {
        return {
            chapter: chapter,
            verse: verse,
            error: true,
            message: "Not a verse in that chapter of Psalms."
        };
    }
  
    return {
        chapter: chapter,
        verse: verse,
        error: false,
        message: book.psalms[chapterIndex][verseIndex]
    };
};
