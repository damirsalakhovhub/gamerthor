class UsersController < ApplicationController
  layout 'app'

  def create
    @user = User.new(user_params)
    
    if @user.save
      session[:user_id] = @user.id
      redirect_to user_path(@user), notice: 'User successfully registered!'
    else
      redirect_to root_path, alert: 'Registration failed. Please try again.'
    end
  end

  def show
    @user = User.find(params[:id])
  end

  def index
    @users = User.all
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :age, :city)
  end
end
