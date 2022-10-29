using AutoMapper;
using GameBuster.DTOs;
using GameBuster.Models;

namespace GameBuster
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Game, GameDTO>().ForMember(dst => dst.Platforms, opts => opts.MapFrom(src => src.Platforms.Select(p => p.Type))).ReverseMap().ForPath(src => src.Platforms,opt => opt.Ignore());
            CreateMap<Rent, RentDTO>().ReverseMap();
            CreateMap<Character, CharacterDTO>().ReverseMap();
            CreateMap<Customer,CustomerDTO>().ReverseMap();
            CreateMap<Platform, PlatformDTO>().ReverseMap();
        }
    }
}
