import React, { Component } from 'react';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import AdminLayout from '../../../../hoc/adminLayout';
import {
    FormElement,
    BookSchema
} from '../Posts/utils/postsHelper'

// WYSIWYG
import { EditorState } from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { connect } from 'react-redux';
import { addBook, clearBook } from '../../../../store/actions/book_actions';


class AdddPosts extends Component{
    state ={
        editorState: EditorState.createEmpty(),
        editorContentHtml: '',
        success: false
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
            editorContentHtml: stateToHTML(editorState.getCurrentContent())
        })
    }

    onPostBook = (values) => {
        this.props.dispatch(addBook(values));
    }

    componentDidUpdate(prevProps){
        const hasChanged = this.props.books !== prevProps.books
        if(hasChanged){
            this.setState({success: true})
        }
    }

    componentWillUnmount(){
        this.props.dispatch(clearBook())
    }

    render(){
        return(
            <AdminLayout>
                <h4>Add a Post</h4>

                <Formik
                    initialValues={{
                        name: '',
                        author: '',
                        pages: '',
                        rating: '',
                        price: ''
                    }}
                    validationSchema = {BookSchema}  
                    onSubmit={(values, {resetForm}) => {
                        this.onPostBook({
                            ...values,
                            content: this.state.editorContentHtml
                        })
                        this.setState({
                            editorState: EditorState.createEmpty(),
                            editorContentHtml: '',
                        })
                        resetForm({})
                    }}
                >

                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit
                }) => (
                    <form onSubmit = {handleSubmit}>
                        <FormElement
                            elData={{ element:'input', type:'text', value:values.name }}
                            placeholder="The title of the book"
                            name="name"
                            onHandleChange={(e) => handleChange(e)}
                            onHandleBlur={(e) => handleBlur(e)}
                            errors={errors.name}
                            touched={touched.name}
                        />

                        <Editor
                            editorState={this.state.editorState}
                            wrapperClassName="demo-wrapper"
                            editorClassName="demo-editor"
                            onEditorStateChange={this.onEditorStateChange}
                        />

                        <h4>Book Info</h4>
                        
                        <FormElement
                            elData={{ element:'input', type:'text', value:values.author }}
                            placeholder="The author's name"
                            name="author"
                            onHandleChange={(e) => handleChange(e)}
                            onHandleBlur={(e) => handleBlur(e)}
                            errors={errors.author}
                            touched={touched.author}
                        />

                        <FormElement
                            elData={{ element:'input', type:'number', value:values.pages }}
                            placeholder="How many pages"
                            name="pages"
                            onHandleChange={(e) => handleChange(e)}
                            onHandleBlur={(e) => handleBlur(e)}
                            errors={errors.pages}
                            touched={touched.pages}
                        />  

                        <FormElement
                            elData={{ element:'select', value:values.rating }}
                            name="rating"
                            onHandleChange={(e) => handleChange(e)}
                            onHandleBlur={(e) => handleBlur(e)}
                            errors={errors.rating}
                            touched={touched.rating}
                        >
                            <option default>Select a rating</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>

                        </FormElement>  

                        <FormElement
                            elData={{ element:'input', type:'number', value:values.price }}
                            placeholder="What is the price"
                            name="price"
                            onHandleChange={(e) => handleChange(e)}
                            onHandleBlur={(e) => handleBlur(e)}
                            errors={errors.price}
                            touched={touched.price}
                        />  

                        <button type="submit">
                            ADD BOOK
                        </button>

                        <br/>

                        {
                            this.state.success ?
                            <div className="succes_entry">
                                <div>Congrats !!!</div>
                                <Link to={`/article/${this.props.books.add.bookId}`}>
                                    See your book
                                </Link>
                            </div>
                            : null
                        }

                    </form>

                )}

                </Formik>

            </AdminLayout>
        )
    }
}

function mapStateToProps(state){
    return {
        books: state.books
    }
}

export default connect(mapStateToProps)(AdddPosts);