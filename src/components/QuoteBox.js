import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faLightbulb } from '@fortawesome/free-regular-svg-icons';

export class QuoteBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quoteIndex: 0,
            quoteArr: [{ quote: "Fetching quote", author: "Fetching author" }]
        };
        this.changeQuote = this.changeQuote.bind(this);
    }

    async componentDidMount() {
        const url =
            "https://gist.githubusercontent.com/dev-alexh/dfb3c7d3c5fdcb4978e826b99537bd19/raw/655a48f996936aa20adb024fa0db32e5c8a38a33/quotes.json";
        const response = await fetch(url);
        const data = await response.json();
        this.setState({
            quoteIndex: Math.floor(Math.random() * data.length),
            quoteArr: data
        });
    }

    changeQuote() {
        this.setState((state) => {
            var randomIndex = Math.floor(Math.random() * state.quoteArr.length);
            //different index from previous index
            while (randomIndex == state.quoteIndex) {
                randomIndex = Math.floor(Math.random() * state.quoteArr.length);
            }
            return {
                quoteIndex: randomIndex,
                quoteArr: state.quoteArr
            };
        });
    }

    render() {
        const quote = this.state.quoteArr[this.state.quoteIndex].quote;
        const author = this.state.quoteArr[this.state.quoteIndex].author;
        return (
            <div>
                <h1>Everyday Quotes</h1>
                <p id="text">{'"' + quote + '"'}</p>
                <p id="author">{"-" + author}</p>
                <div id="actions">
                    <button id="new-quote" onClick={this.changeQuote}>
                        <FontAwesomeIcon icon={faLightbulb} /> Inspire Me
                    </button>
                    <p>
                        Inspiring?{" "}
                        <a
                            href={
                                "https://twitter.com/intent/tweet?hashtags=quotes&text=" +
                                encodeURIComponent('"' + quote + '" ' + author)
                            }
                            id="tweet-quote"
                            target="_blank"
                        >
                            <FontAwesomeIcon icon={faTwitter} /> Tweet this!
                        </a>
                    </p>
                </div>
                <footer>
                    <p> Alex H, 2020. freeCodeCamp</p>
                </footer>
            </div>
        );
    }
}