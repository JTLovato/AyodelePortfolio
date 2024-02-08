import React, { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Store } from "../Store";
import { getError } from "../utils";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import HTMLTagRenderer from "../components/HTMLTagRenderer";
import Accordion from "react-bootstrap/Accordion";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true };
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false };
    case "UPLOAD_REQUEST":
      return { ...state, loadingUpload: true, errorUpload: "" };
    case "UPLOAD_SUCCESS":
      return {
        ...state,
        loadingUpload: false,
        errorUpload: "",
      };
    case "UPLOAD_FAIL":
      return { ...state, loadingUpload: false, errorUpload: action.payload };

    default:
      return state;
  }
};
export default function InfoEditScreen() {
  const navigate = useNavigate();
  const params = useParams(); // /info/:id
  const { id: infoId } = params;

  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
    });

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [source, setSource] = useState("");
  const [image, setImage] = useState("");
  const [blog, setBlog] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/infos/${infoId}`);
        setTitle(data.title);
        setSlug(data.slug);
        setImage(data.image);
        setSource(data.source);
        setBlog(data.blog);
        setType(data.type);
        setDescription(data.description);
        dispatch({ type: "FETCH_SUCCESS" });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [infoId]);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "UPDATE_REQUEST" });
      await axios.put(
        `/api/infos/${infoId}`,
        {
          _id: infoId,
          title,
          slug,
          image,
          source,
          blog,
          description,
          type,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: "UPDATE_SUCCESS",
      });
      toast.success("Info updated successfully");
      navigate("/admin/infos");
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: "UPDATE_FAIL" });
    }
  };
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("file", file);
    try {
      dispatch({ type: "UPLOAD_REQUEST" });
      const { data } = await axios.post("/api/upload", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: "UPLOAD_SUCCESS" });

      toast.success("Image uploaded successfully");
      setImage(data.secure_url);
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: "UPLOAD_FAIL", payload: getError(err) });
    }
  };

  const sampleCode = `<b>Bold</b>   <h1>LARGEST HEADER</h1>   <h2></h2>   <h3>Medium Header</h3>   <h4></h4>
     <h5>smallest header</h5>   <span class="SEE_SECOND_MENU"></span>   <i>Italics</i>   <p>paragraph</>
        <blockquote>"Block Quote"</blockquote>   <div class="SEE_SECOND_MENU">Divide</div>   <caption>Caption</caption> 
      <a href="www.YOUR_LINK_HERE.com">Your Link Name</a>   <table> <tbody> <th> </th> <tr> </tr> </tbody> </table>
`;

  const sampleCode2 = `COLORS: White, Red, Blue, Pink, Yellow, Green. class="font-COLOR"
BACKGROUND COLORS: White, Red, Blue, Pink, Yellow, Green. class="bg-COLOR" class="new-font"

`;

  return (
    <Container className='margin-holder center'>
      <Helmet>
        <title>Edit Info ${infoId}</title>
      </Helmet>
      <h1 className='new-font'>Edit Info {infoId}</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant='danger'>{error}</MessageBox>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group className='mb-3' controlId='title'>
            <Form.Label>Title</Form.Label>
            <Form.Control
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='slug'>
            <Form.Label>Slug</Form.Label>
            <Form.Control
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
              disabled
              readonly
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='imageFile'>
            <Form.Label>Upload File</Form.Label>
            <Form.Control type='file' onChange={uploadFileHandler} />
            {loadingUpload && <LoadingBox></LoadingBox>}
          </Form.Group>
          <Form.Group className='mb-3' controlId='brand'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='countInStock'>
            <Form.Label>Type</Form.Label>
            <Form.Select
              onChange={(e) => setType(e.target.value)}
              aria-label='Default select example'
              required
            >
              <option>Select Type</option>
              <option value='podcast'>Podcast</option>
              <option value='video'>Video</option>
              <option value='blog'>Blog</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className='mb-3' controlId='source'>
            <Form.Label>Source</Form.Label>
            <Form.Control
              value={source}
              onChange={(e) => setSource(e.target.value)}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='category'>
            <Form.Label>Blog</Form.Label>
            <Form.Control
              value={blog}
              onChange={(e) => setBlog(e.target.value)}
              required
              as='textarea'
              rows={5}
            />
            <p>Preview:</p>
            <div className='editable-blog-preview'>
              <HTMLTagRenderer
                allowedTags={[
                  "b",
                  "div",
                  "p",
                  "blockquote",
                  "caption",
                  "h1",
                  "h2",
                  "h3",
                  "h4",
                  "h5",
                  "i",
                  "hr",
                  "span",
                  "table",
                  "tbody",
                  "tr",
                  "td",
                  "em",
                  "strong",
                  "i",
                ]}
                string={blog}
              />
            </div>
            <Accordion flush>
              <Accordion.Item eventKey='0'>
                <Accordion.Header>Markup Guide</Accordion.Header>
                <Accordion.Body>
                  <p className='sample-code'>
                    <code>{sampleCode}</code>
                  </p>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey='1'>
                <Accordion.Header>Classes Guide</Accordion.Header>
                <Accordion.Body>
                  {" "}
                  <p className='sample-code'>
                    <code>{sampleCode2}</code>
                  </p>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Form.Group>
          <div className='mb-3'>
            <button
              className='recurring-button'
              disabled={loadingUpdate}
              type='submit'
            >
              Update
            </button>
            {loadingUpdate && <LoadingBox></LoadingBox>}
          </div>
        </Form>
      )}
    </Container>
  );
}
