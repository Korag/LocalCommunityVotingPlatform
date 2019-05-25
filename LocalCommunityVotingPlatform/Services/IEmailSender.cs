using System.Threading.Tasks;

namespace LocalCommunityVotingPlatform.Services
{
    interface IEmailSender
    {
        Task SendEmail(string email, string subject, string message);
    }
}
