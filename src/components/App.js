import React from "react";
import { connect } from 'react-redux';
import { setBalance, setOf100, setOf50, setOf20, showModalError, showModalSuccess } from "../actions/AtmAction";
import { Button, FormControl, Modal } from "react-bootstrap";

import "./app.css";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            clientSumGet: 0,
        }
    }

    modalError() {
        return (
            <Modal show={this.props.atm.showModalError} onHide={this.close} aria-labelledby="contained-modal-title">
                <Modal.Header>
                    <Modal.Title>Ошибка</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Вы не можете снять больше чем {this.props.atm.balance}</h4>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.onHandleClose.bind(this)}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }

    modalSuccess() {
        return (
            <Modal show={this.props.atm.showModalSuccess} onHide={this.close} aria-labelledby="contained-modal-title">
                <Modal.Header>
                    <Modal.Title>Поздравляем</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Вы сняли {this.state.clientSumGet}</h4>
                    <p>
                        Купюрами по: <br/>
                        {this.props.atm.default_100}: {this.props.atm.count_of_100}<br/>
                        {this.props.atm.default_50}: {this.props.atm.count_of_50}<br/>
                        {this.props.atm.default_20}: {this.props.atm.count_of_20}
                    </p>
                    <h4>Вашь баланс составляет {this.props.atm.balance}</h4>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.onHandleClose.bind(this)}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }

    onHandleClose() {
        this.props.showModalError(false);
        this.props.showModalSuccess(false);
        this.props.setOf100(0);
        this.props.setOf50(0);
        this.props.setOf20(0);
    }

    onHandleGetMoney() {
        let valid = true;
        let sumGet = Number(this.clientSumValue.value);
        let newBalance= this.props.atm.balance - sumGet;

        if (this.props.atm.balance < sumGet || !(sumGet % 10 === 0) || this.props.atm.default_20 > sumGet) {
            this.props.showModalError(true);
            this.props.showModalSuccess(false);
            valid = false;
            this.clientSumValue.value = '';
        }

        if(valid && sumGet !== 0){
            const of100 = countOfNotes(this.props.atm.default_100);
            this.props.setOf100(of100);

            const of50 = countOfNotes(this.props.atm.default_50);
            this.props.setOf50(of50);

            const of20 = countOfNotes(this.props.atm.default_20);
            this.props.setOf20(of20);

            function countOfNotes(currency) {
                let countOf;
                if(sumGet >= currency) {
                    if(sumGet % 20 === 0) {
                        countOf = Math.floor(sumGet / currency);
                        let remainder = sumGet % currency;
                        if(remainder % 20 !== 0 && remainder < currency) {
                            countOf -= 1;
                            sumGet = remainder + currency;
                        }
                        sumGet -= countOf * currency;
                    }else{
                        countOf = Math.floor(sumGet / currency);
                        let remainder = sumGet % currency;
                        if(remainder % 20 !== 0) {
                            countOf -= 1;
                            remainder += currency;
                        }
                        sumGet = remainder;
                    }
                }
                return countOf;
            }

            this.props.setBalance(newBalance);
            this.setState({
                clientSumGet: this.clientSumValue.value,
            });
            this.props.showModalSuccess(true);
        }
        this.clientSumValue.value = '';
    }

    render() {
        return (
            <div className="atm">
                {this.modalError()}
                {this.modalSuccess()}
                <div className="row">
                    <div className="col-xs-8">
                        <FormControl
                            type="text"
                            placeholder="Введите сумму"
                            inputRef={ref => { this.clientSumValue = ref; }}
                        />
                    </div>
                    <div className="col-xs-4">
                        <Button onClick={this.onHandleGetMoney.bind(this)}>Снять</Button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setBalance: sum => dispatch(setBalance(sum)),
        setOf100: count => dispatch(setOf100(count)),
        setOf50: count => dispatch(setOf50(count)),
        setOf20: count => dispatch(setOf20(count)),
        showModalError: error => dispatch(showModalError(error)),
        showModalSuccess: success => dispatch(showModalSuccess(success)),
    }
};

const mapStateToProps = (state) => {
    return {
        atm: state.atm
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
