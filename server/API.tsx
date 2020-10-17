declare namespace API{
    interface ValidatePasswordLoginRequest{
        password: string
    }

    interface ValidatePasswordLoginResponse{
        
    }

    interface ValidateLinkLoginRequest{

    }

    interface ValidateLinkLoginResponse{
        
    }

    interface GenerateLinkLoginRequest{
        token : string
    }

    interface GenerateLinkLoginResponse{
        link : string
    }
}

exports.api = {API}