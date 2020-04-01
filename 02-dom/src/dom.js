
const functions = {

    buildCard (text) {

        const div = document.createElement('div');
        div.classList.add("card");
        div.appendChild(document.createTextNode(text));

        const addBefore = document.createElement('button');
        addBefore.appendChild(document.createTextNode("Add Before"));
        div.appendChild(addBefore);

        const addAfter = document.createElement('button');
        addAfter.appendChild(document.createTextNode("Add After"));
        div.appendChild(addAfter);

        const deleteCard = document.createElement('button');
        deleteCard.appendChild(document.createTextNode("Delete"));
        div.appendChild(deleteCard);

        return div;
    },

    addAfter(node, text) {
        const div = functions.buildCard(text);
        node.parentElement.insertBefore(div, node);
    },
    addBefore(node, text) {
        const div = functions.buildCard(text);
        node.parentElement.insertBefore(div, node.nextSibling);
    },
    deleteCard(node) {
        node.nextSibling.remove(node);
        
    }
    
};

export default functions;
