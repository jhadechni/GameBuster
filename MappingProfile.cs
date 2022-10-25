using AutoMapper;
using GameBuster.DTOs;
using GameBuster.Models;

namespace GameBuster
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Game, GameDTO>().ForMember(dst => dst.Platforms, opts => opts.MapFrom(src => src.Platforms.Select(p => p.Type)));
            CreateMap<Rent, RentDTO>();
        }
    }
}
