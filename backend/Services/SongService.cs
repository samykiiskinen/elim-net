using backend.Models;
using backend.Repositories.Interfaces;
using backend.Services.Interfaces;

namespace backend.Services
{
    public class SongService : ISongService
    {
        private readonly ISongRepository _repository;

        public SongService(ISongRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<Song>> GetAllSongsAsync()
        {
            return await _repository.GetAllSongsAsync();
        }

        public async Task<Song> GetSongByIdAsync(int id)
        {
            return await _repository.GetSongByIdAsync(id);
        }

        public async Task AddSongAsync(Song song)
        {
            await _repository.AddSongAsync(song);
        }

        public async Task DeleteSongAsync(int id)
        {
            await _repository.DeleteSongAsync(id);           
        }

        public async Task UpdateSongAsync(Song song)
        {

            await _repository.UpdateSongAsync(song);
        }

        public async Task ReplaceSongAsync(Song song)
        {
            await _repository.ReplaceSongAsync(song);
        }
    }
}
