import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Search = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const query = queryParams.get("query");

        console.log('Query from URL:', query);

        if (query) {
            setLoading(true);
            fetch(`http://localhost:8003/api/search?query=${encodeURIComponent(query)}`)

                .then((response) => {
                    console.log('API response status:', response.status);
                    if (!response.ok) {
                        throw new Error('Failed to fetch results.');
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log('API response data:', data);
                    if (data.message) {
                        setResults([]);
                        setError(data.message);
                    } else {
                        setResults(data);
                        setError(null);
                    }
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Fetch error:', error);
                    setError(error.message);
                    setLoading(false);
                });
        } else {
            setError("Please enter a search query.");
        }
    }, [location.search]);

    return (
        <div className="container">
            <h1>Search Results</h1>
            {loading && <p>Loading...</p>}
            {error && <p className="text-danger">{error}</p>}
            {results.length > 0 ? (
                <ul className="list-group">
                    {results.map((result) => (
                        <li key={result._id} className="list-group-item">
                            <a href={`/view/${result._id}`} style={{ textDecoration: "none" }}>
                                <strong>{result.name}</strong> <br />
                                <small>{result.email}</small> <br />
                                <small>{result.work}</small>
                            </a>
                        </li>
                    ))}
                </ul>
            ) : (
                !loading && <p>No results found.</p>
            )}
        </div>
    );
};

export default Search;
