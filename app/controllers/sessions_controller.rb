class SessionsController < ApplicationController
  layout 'app'

  def new
  end

  def create
    @user = User.find_by(
      first_name: params[:first_name], 
      last_name: params[:last_name]
    )
    
    if @user
      session[:user_id] = @user.id
      redirect_to user_path(@user), notice: 'Successfully logged in!'
    else
      redirect_to root_path, alert: 'User not found. Please check your name and surname.'
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_path, notice: 'Successfully logged out!'
  end
end
