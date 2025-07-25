import css from './MovieModal.module.css';
import type { Movie } from '../types/movie';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';


interface MovieModalProps {
    movie: Movie;
    onClose: () => void;
}

const modalRoot = document.getElementById('modal-root') as HTMLElement;
if (!modalRoot) {
    throw new Error('Modal root element not found');
}

const MovieModal = ({ movie, onClose }: MovieModalProps) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        }

        const handleClickOutside = (e: MouseEvent) => {
            if ((e.target as HTMLElement).classList.contains(css.backdrop)) {
                onClose();
            }
        }

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('click', handleClickOutside);

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('click', handleClickOutside);
        };
    }, [onClose]);

    return createPortal(
        <div className={css.backdrop} role="dialog" aria-modal="true">
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



    


