<!-- const result = await db.collection('books').insertMany([
    {
        title: "Find Me",
        description: "about book",
        authors: "A Aciman"
    },
    {
        title: "Диалоги",
        description: "философия",
        authors: "Платон"
    }
])

const allId = result.insertedIds;

const item = db.collection('books').find({
    title: 'Find Me'
})

db.collection('books').updateOne(
    {_id: allId[0]},
    {
        $set: { description: 'all about books', authors: 'Author'},
        $currentDate: {lastModified: true}
    }
) -->