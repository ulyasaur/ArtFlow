using ArtFlow.BLL.DTOs;
using ArtFlow.Core.Entities;
using ArtFlow.ViewModels;
using AutoMapper;

namespace ArtFlow.Mapping
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles() 
        {
            CreateMap<RegisterViewModel, User>();

            CreateMap<UserUpdateViewModel, User>();

            CreateMap<User, UserViewModel>();

            CreateMap<State, StateViewModel>();

            CreateMap<StateViewModel, State>();

            CreateMap<Room, RoomViewModel>()
                .ForMember(d => d.NumberOfPieces, o => o.MapFrom(s => s.RoomArtpieces.Count));

            CreateMap<RoomViewModel, Room>();

            CreateMap<RoomAddViewModel, Room>();

            CreateMap<KeepRecommendation, KeepRecommendationViewModel>();

            CreateMap<Photo, PhotoViewModel>();

            CreateMap<Artpiece, ArtpieceViewModel>();

            CreateMap<ArtpieceAddViewModel, ArtpieceDto>();

            CreateMap<ArtpieceUpdateViewModel, ArtpieceDto>();

            CreateMap<Exhibition, ExhibitionViewModel>();

            CreateMap<ExhibitionUpdateViewModel, Exhibition>();

            CreateMap<Order, OrderViewModel>();

            CreateMap<OrderAddViewModel, Order>();
        }
    }
}
