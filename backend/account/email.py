from djoser.email import ActivationEmail

class ActivationEmail(ActivationEmail):
    def get_context_data(self):
        context = super().get_context_data()
        # Customize the email subject and content
        context['subject'] = 'Custom Activation Email Subject'
        context['message'] = 'Custom message for activation email.'
        print(context)
        return context