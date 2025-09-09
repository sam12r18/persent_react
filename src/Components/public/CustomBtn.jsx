import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import {useState} from "react";

export default function CustomBtn({text,loadingText}){
    const [loading , setLoading]=useState(false)
    return(
        <Button
            variant="primary"
            type="submit"
            className="w-100 rounded-5 fs-6 input-color border border-color py-3"
            disabled={loading}
        >
            {loading ? (
                <>
                    <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-2"
                    />
                    {loadingText}
                </>
            ) : (
                <span>
                    {text}
                </span>
            )}
        </Button>
    )
}