import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class HeaderForPage extends Component {
    render() {
        return (
            <div class="jumbotron jumbotron-fluid page-header position-relative overlay-bottom margin-bottom" >
                <div class="container text-center py-5 my-5">
                    <h1 class="text-white display-1">{this.props.name}</h1>
                    <div class="d-inline-flex text-white mb-5">
                        <p class="m-0 text-uppercase"> <Link to={'/'} class="text-white" href="">Home</Link></p>
                        <i class="fa fa-angle-double-right pt-1 px-3"></i>
                        <p class="m-0 text-uppercase">{this.props.name}</p>
                    </div>
                    {/* <!-- <div class="mx-auto mb-5" style="width: 100%; max-width: 600px;">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <button class="btn btn-outline-light bg-white text-body px-4 dropdown-toggle" type="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Courses</button>
                                <div class="dropdown-menu">
                                    <a class="dropdown-item" href="#">Courses 1</a>
                                    <a class="dropdown-item" href="#">Courses 2</a>
                                    <a class="dropdown-item" href="#">Courses 3</a>
                                </div>
                            </div>
                            <input type="text" class="form-control border-light" style="padding: 30px 25px;"
                                placeholder="Keyword">
                                <div class="input-group-append">
                                    <button class="btn btn-secondary px-4 px-lg-5">Search</button>
                                </div>
                        </div>
                    </div> --> */}
                </div>
            </div>
        )
    }
}
