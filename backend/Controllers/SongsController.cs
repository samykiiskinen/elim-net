using backend.DTOs;
using backend.Models;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SongsController : ControllerBase
    {
        private readonly ISongService _service;

        public SongsController(ISongService service)
        {
            _service = service;
        }

        [Authorize(Roles = "Admin, Music")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Song>>> GetSongs()
        {
            var songs = await _service.GetAllSongsAsync();
            return Ok(songs);
        }

        [Authorize(Roles = "Admin, Music")]
        [HttpGet("{id}")]
        public async Task<ActionResult<Song>> GetSong(int id)
        {
            var song = await _service.GetSongByIdAsync(id);

            if (song == null)
            {
                return NotFound();
            }

            return Ok(song);
        }

        [Authorize(Roles = "Admin, Music")]
        [HttpPost]
        public async Task<ActionResult<Song>> PostSong([FromBody] Song song)
        {
            if (song == null)
            {
                return BadRequest("Song is required");
            }
            await _service.AddSongAsync(song);
            return CreatedAtAction("GetSong", new { id = song.Id }, song);
        }

        [Authorize(Roles = "Admin, MusicAdmin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSong(int id)
        {
            var song = await _service.GetSongByIdAsync(id);
            if (song == null)
            {
                return NotFound();
            }
            return Ok(song);
        }

        [Authorize(Roles = "Admin, MusicAdmin")]
        [HttpPatch]
        public async Task<IActionResult> UpdateSongAsync(int id, [FromBody] SongPatchDto songPatchDto)
        {
            if (songPatchDto == null)
            {
                return BadRequest("Invalid song data.");
            }

            var song = await _service.GetSongByIdAsync(id);
            if (song == null)
            {
                return NotFound("Song not found.");
            }

            if (!string.IsNullOrEmpty(songPatchDto.SongTitle))
            {
                song.SongTitle = songPatchDto.SongTitle;
            }
            if (!string.IsNullOrEmpty(songPatchDto.SongText))
            {
                song.SongText = songPatchDto.SongText;
            }
            if (songPatchDto.SongKey.HasValue)
            {
                song.SongKey = songPatchDto.SongKey.Value;
            }

            await _service.UpdateSongAsync(song);

            return NoContent();
        }

        [Authorize(Roles = "Admin, MusicAdmin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> ReplaceSong(int id, [FromBody] Song song)
        {
            if (song == null || song.Id != id)
            {
                return BadRequest("Invalid song data");
            }

            var existingSong = await _service.GetSongByIdAsync(id);
            if (existingSong == null)
            {
                return NotFound($"Song not found");
            }

            existingSong.SongTitle = song.SongTitle;
            existingSong.SongText = song.SongText;
            existingSong.SongKey = song.SongKey;

            await _service.UpdateSongAsync(existingSong);

            return NoContent();
        }
    }
}
