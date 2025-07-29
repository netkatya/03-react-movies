import css from './MovieModal.module.css';
import type { Movie } from '../../types/movie';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';


interface MovieModalProps {
    movie: Movie;
    onClose: () => void;
}



const MovieModal = ({ movie, onClose }: MovieModalProps) => {
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
      
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown)
    };
  }, [onClose]);

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
            if (e.target === backdropRef.current) {
                onClose();
            }
        }

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) {
    console.error('modal-root not found')
    return null;
        }
;

    return createPortal(
        <div className={css.backdrop} role="dialog" aria-modal="true" onClick={handleClickOutside} ref={backdropRef}> 
          <div className={css.modal}>
            <button
              className={css.closeButton}
              onClick={onClose}
              aria-label="Close modal"
            >
              &times;
            </button>
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
              className={css.image}
            />
            <div className={css.content}>
              <h2>{movie.title}</h2>
              <p>{movie.overview}</p>
              <p>
                <strong>Release Date:</strong> {movie.release_date}
              </p>
              <p>
                <strong>Rating:</strong> {movie.vote_average}/10
              </p>
            </div>
          </div>
        </div>,
        modalRoot
      );
}

export default MovieModal;



    


