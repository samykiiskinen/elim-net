using backend.Models;

namespace backend.Repositories.Interfaces
{
    public interface ISongRepository
    {
        Task<List<Song>> GetAllSongsAsync();
        Task<Song> GetSongByIdAsync(int id);
        Task AddSongAsync(Song song);

        Task DeleteSongAsync(int songId);

        Task UpdateSongAsync(Song song);

        Task ReplaceSongAsync(Song song);
    }
}
