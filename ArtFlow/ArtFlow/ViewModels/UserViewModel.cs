namespace ArtFlow.ViewModels
{
    public class UserViewModel
    {
        public string Id { get; set; }

        public string Username { get; set; }

        public string Role { get; set; }

        public string Email { get; set; }

        public string PhotoId { get; set; }

        public PhotoViewModel Photo { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Bio { get; set; }
    }
}
