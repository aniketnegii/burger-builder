import React, { Component } from 'react';
import Aux from '../Auxillary/Auxillary';
import Modal from './../../components/UI/Modal/Modal';

const withErrorhandler = (WrappedComponent, axios) => {
    return (
        class extends Component{

            state= {
                error: null
            }
            // constructor(props) {
            //     super(props);
            //     this.reqInterceptor = axios.interceptors.request.use(req => {
            //         this.state = {
            //             error: null
            //         };
            //         return req;
            //     });
            //     this.resInterceptor = axios.interceptors.response.use(res => res, error => {
            //         this.state = {
            //             error : error
            //         };
            //     });
            // }

            // constructor() {
            //     super();
            //     let tempErrorState = null;
        
            //     this.requestInterceptor = axios.interceptors.request.use(req => {
            //         tempErrorState = null;
            //         return req;
            //     });
            //     this.resoponseInterceptor = axios.interceptors.response.use(res => res, error => {
            //         tempErrorState = error;
            //         console.log(tempErrorState);
            //     });

            //     this.state = {
            //         error: tempErrorState
            //     };

            //     console.log(this.state.error);
            //     console.log(tempErrorState);
            // }

            componentWillMount() {
                this.reqInterceptor = axios.interceptors.request.use(req => {
                    this.setState({error: null});
                    //this.state.error = null;
                    return req;
                });
                this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                    this.setState({error:error});
                    //this.state.error = error;
                });
            }

            componentWillUnmount() {
                axios.interceptors.request.eject(this.reqInterceptor);
                axios.interceptors.response.eject(this.resInterceptor);
            }
            
            errorConfirmedHandler = () => {
                this.setState({error: null});
            }

            render(){
                return (
                    <Aux>
                        <Modal 
                            show={this.state.error}
                            modalClosed={this.errorConfirmedHandler}>
                            {this.state.error ? this.state.error.message : null}
                        </Modal>
                        <WrappedComponent {...this.props} />
                    </Aux>
                );
            }
        }
    )
}

export default withErrorhandler
