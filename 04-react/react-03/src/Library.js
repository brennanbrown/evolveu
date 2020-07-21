import React, { Component } from "react"
import PropTypes from "prop-types"
import { Book } from "./Book"
import { Hiring } from "./Hiring"
import { NotHiring } from "./NotHiring"
import './App.css';

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
        fetch("https://hplussport.com/api/products/order/price/sort/asc/qty/1")
            .then(data => data.json())
            .then(data => this.setState({data, loading: false}))
        
    }

    componentDidUpdate() { 
        
    }

    toggleOpenClosed = () => {
        // Adding prevState will make sure that this.setState, 
        // no matter how long it takes, will work as expected.
        this.setState(prevState => ({
            open: !prevState.open
        }))
    }

    render() {
        
        const { books } = this.props
        return (
            // Using component lifecycle to fetch some remote data and display it:
            <div class="library">
                <h1>Welcome to the Library Website!</h1>
                {this.state.hiring ? <Hiring /> : <NotHiring />}
                {this.state.loading
                    ? "Loading..."
                    : <div>
                        {this.state.data.map(product => {
                            return (
                                <div class="advertisement">
                                    <h3><small>[Advertisement]</small> Library Product of the Week:</h3>
                                    <h4>{product.name}</h4>
                                    <img src={product.image} height={100}/>
                                    <hr/>
                                </div>
                            )
                        })}
                    </div>
                }
				<h1>The library is currently {this.state.open ? 'open' : 'closed'}!</h1>
				<button onClick={this.toggleOpenClosed}>Change</button>  <hr/>
                <h1>Current Book Selection: </h1>
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

export default Library