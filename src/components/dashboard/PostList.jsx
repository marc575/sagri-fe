import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  // Fonction pour charger les posts
  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(response.data);
      setFilteredPosts(response.data);
      setCurrentPage(1); // Reset à la première page après rechargement
    } catch (err) {
      setError('Erreur lors du chargement des articles');
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  // Chargement initial
  useEffect(() => {
    fetchPosts();
  }, []);

  // Filtrage des posts
  useEffect(() => {
    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.body.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(filtered);
    setCurrentPage(1); // Reset à la première page après recherche
  }, [searchTerm, posts]);

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="py-12 container mx-auto px-4 sm:px-6">
      
      <div className="controls">
        <input
          type="text"
          placeholder="Rechercher par titre ou contenu..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full"
        />
        <button 
          onClick={fetchPosts}
          disabled={loading}
          className="reload-button btn btn-primary"
        >
          {loading ? 'Chargement...' : 'Actualiser'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading && posts.length === 0 ? (
        <div className="loading-indicator">Chargement en cours...</div>
      ) : (
        <>
          <div className="results-info">
            {filteredPosts.length} résultats trouvés - Page {currentPage} sur {totalPages}
          </div>
          
          <ul className="posts-list">
            {currentPosts.map(post => (
              <li key={post.id} className="post-item">
                <h3>{post.title}</h3>
                <p>{post.body}</p>
              </li>
            ))}
          </ul>

          {filteredPosts.length > postsPerPage && (
            <div className="pagination">
              <button
                onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                disabled={currentPage === 1}
              >
                Précédent
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={currentPage === number ? 'active' : ''}
                >
                  {number}
                </button>
              ))}
              
              <button
                onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                disabled={currentPage === totalPages}
              >
                Suivant
              </button>
            </div>
          )}
        </>
      )}

      {filteredPosts.length === 0 && !loading && (
        <div className="no-results">Aucun article trouvé</div>
      )}
    </div>
  );
}

export default PostList;