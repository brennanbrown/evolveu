import React, { Component}  from "react"
import ReactDOM, { render } from "react-dom"
// Will have to run `npm install prop-types --save` to install this new package.
import PropTypes from "prop-types"

// Mock Database
let bookList = [
    {"title": "The Sun Alsos Rises", "author": "Ernest Hemingway", "pages": 260},
    {"title": "White Teeth", "author": "Zadie Smith", "pages": 480},
    {"title": "Cat's Cradle", "author": "Kurt Vonnegut", "pages": 304},
]

// Using default argument syntax,
// in the event that an object is missing properties.
const Book = ({title = "No Title Provided", author = "No Author Provided", pages = 0, freeBookmark}) => {
    return (
        <section>
            <h2>{title}</h2>
            <p>By: {author}</p>
            <p>Pages: {pages}</p>
            <p>Free Bookmark Today: {freeBookmark ? "yes!" : "no!"}</p>
        </section>
    )
}

// New Conditionals for Rendering
const Hiring = () => 
    <div>
        <p>The library is hiring. Go to www.library.com/jobs for more information.</p>
    </div>

const NotHiring = () =>
    <div>
        <p>The library is not hiring. Check back later for more information.</p>
    </div>

class Library extends Component {
    // Default Props
    static defaultProps = {
        books: [
            {"title": "Tahoe Tales", "author": "Chet Whitley", "pages": 100}
        ]
    }

    state = { 
        open: true,
        freeBookmark: true,
        hiring: false,
        // Fetching Data Example:
        data: [],
        loading: false
    }

    componentDidMount() {
        this.setState({loading: true})
        // Fetching data from a REST API
        fetch("https://hplussport.com/api/products/order/price/sort/asc/qty1")
            .then(data => data.json())
            .then(data => this.setState({data, loading: false}))
        console.log("This component has now mounted!")
    }

    componentDidUpdate() { 
        console.log("This component has now updated!") 
    }

    toggleOpenClosed = () => {
        // Adding prevState will make sure that this.setState, 
        // no matter how long it takes, will work as expected.
        this.setState(prevState => ({
            open: !prevState.open
        }))
    }

    render() {
        console.log(this.state)
        const { books } = this.props
        return (
            // Using component lifecycle to fetch some remote data and display it:
            <div class="Advertisement">
                {this.state.hiring ? <Hiring /> : <NotHiring />}
                {this.state.loading
                    ? "Loading..."
                    : <div>
                        {this.state.data.map(product => {
                            return (
                                <div>
                                    <h3>Library Product of the Week!</h3>
                                    <h4>{product.name}</h4>
                                    <img src={product.image} height={100}/>
                                </div>
                            )
                        })}
                    </div>
                }
				<h1>The library is {this.state.open ? 'open' : 'closed'}</h1>
				<button onClick={this.toggleOpenClosed}>Change</button>
				{books.map(
					(book, i) => 
						<Book 
							key={i}
							title={book.title} 
							author={book.author} 
							pages={book.pages}
							freeBookmark={this.state.freeBookmark}/>
				)}
			</div>
        )
    }
}

Library.propTypes = {
    // If any other value is not supplied, then we should throw an error.
    books: PropTypes.array
}

Book.propTypes = {
    title: PropTypes.string,
    author: PropTypes.string,
    pages: PropTypes.number,
    freeBookmark: PropTypes.bool
}

render(
    <Library books={bookList}/>,
    document.getElementById("root")
)