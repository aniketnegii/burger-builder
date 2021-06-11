import React, { Component } from 'react';
import Aux from '../Auxillary/Auxillary';
import Modal from './../../components/UI/Modal/Modal';

const withErrorhandler = (WrappedComponent, axios) => {
    return (
        class extends Component{
            
            state = {
                error: null
            }

            constructor(props){
                super(props);
                this.state.error = null;
                this.setErrorstate = this.setErrorstate.bind(this);
                
            }

            setErrorstate(state){
                this.setState({error:state});
            }

            componentDidMount() {
                this.reqInterceptor = axios.interceptors.request.use(req => {
                    this.setErrorstate(null);
                    //this.state.error = null;
                    return req;
                });
                this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                    this.setErrorstate(error);
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
                            Something went wrong.
                        </Modal>
                        <WrappedComponent {...this.props} />
                    </Aux>
                );
            }
        }
    )
}

export default withErrorhandler
