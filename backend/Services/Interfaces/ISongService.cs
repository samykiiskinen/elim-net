using backend.Models;

namespace backend.Services.Interfaces
{
    public interface ISongService
    {
        Task<List<Song>> GetAllSongsAsync();
        Task<Song> GetSongByIdAsync(int id);
        Task AddSongAsync(Song song);

        Task DeleteSongAsync(int songId);

        Task UpdateSongAsync(Song song);

        Task ReplaceSongAsync(Song song);
    }
}
