import React, { Component } from 'react';
import './App.css';
import data from './content.json';

class WidgetTitle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: props.show
        };
        this.title = props.title;
        this.toggleWidget = this.toggleWidget.bind(this);
        document.title = this.title;
    }

    toggleWidget() {
        this.setState({
            show: !this.state.show
        });
    }

    render() {
        return (
            <div className={"widget-title " + (this.state.show ? "active" : "") } onClick={this.toggleWidget}>{this.title}</div>
        );
    }
}

class WidgetControlNav extends Component {
    constructor(props) {
        super(props);
        this.direction = props.direction;
        this.navClick = props.onNavClick;
        this.state = {
            title: props.title
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            title: nextProps.title
        });
    }

    render() {
        if (this.state.title == null) return null;
        return (
            <a className={"widget-nav " + this.direction} onClick={this.navClick}>{this.state.title}</a>
        );
    }
}

class WidgetControl extends Component {
    constructor(props) {
        super(props);
        this.content = props.content;
        this.onPageChage = props.onPageChage;
        this.contentLength = this.content.length;
        this.previousPage = this.previousPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.state = {
            page: 0
        };
    }

    previousPage() {
        if (this.state.page < 1) return false;
        this.setState({
            page: this.state.page - 1
        });
        this.onPageChage(this.state.page - 1);
    }

    nextPage() {
        if (this.state.page >= this.contentLength) return false;
        this.setState({
            page: this.state.page + 1
        });
        this.onPageChage(this.state.page + 1);
    }

    getPreviousTitle() {
        return this.state.page > 0 ? this.content[this.state.page-1].title : null;
    }

    getNextTitle() {
        return this.state.page < this.contentLength - 1 ? this.content[this.state.page+1].title : null;
    }

    render() {
        return (
            <div className="widget-control">
                <WidgetControlNav direction="prev" title={this.getPreviousTitle()} onNavClick={this.previousPage} />
                <WidgetControlNav direction="next" title={this.getNextTitle()} onNavClick={this.nextPage} />
            </div>
        );
    }
}

class WidgetImage extends Component {
    constructor(props) {
        super(props);
        this.src = props.src;
    }

    render() {
        if(this.src == null) return null;
        return (
            <img alt="ipad" src={"images/" + this.src} />
        );
    }
}

class WidgetContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0
        };
        this.content = props.content;
        this.updateContent = this.updateContent.bind(this);
    }

    updateContent(page) {
        this.setState({
            page: page
        });
    }

    render() {
        return (
            <div className="widget-content">
                <div>
                    <WidgetImage src={this.content[this.state.page].thumbnail} />
                    <p dangerouslySetInnerHTML={{__html: this.content[this.state.page].description}}></p>
                </div>
                <WidgetControl content={this.content} onPageChage={this.updateContent} />
            </div>
        );
    }
}

class App extends Component {
    render() {
        return (
            <div className="container">
                <WidgetTitle show={true} title={data.title} />
                <WidgetContent content={data.content} />
            </div>
        );
    }
}

export default App;
